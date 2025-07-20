const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.raw({ type: 'application/json' }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_resume', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Download Token Schema
const downloadTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  },
  used: {
    type: Boolean,
    default: false
  },
  cloudinaryUrl: {
    type: String,
    default: process.env.CLOUDINARY_RESUME_URL
  }
});

const DownloadToken = mongoose.model('DownloadToken', downloadTokenSchema);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio Resume API is running' });
});

// Create Razorpay order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount || 10000, // ₹100 in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        purpose: 'resume_download'
      }
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Razorpay webhook
app.post('/api/razorpay-webhook', (req, res) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    
    if (webhookSignature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    
    if (event.event === 'payment.captured') {
      const paymentEntity = event.payload.payment.entity;
      
      // Generate secure download token
      const downloadToken = uuidv4();
      
      // Save token to database
      const tokenDoc = new DownloadToken({
        token: downloadToken,
        razorpayPaymentId: paymentEntity.id,
        cloudinaryUrl: process.env.CLOUDINARY_RESUME_URL
      });
      
      tokenDoc.save()
        .then(() => {
          console.log('Download token created:', downloadToken);
        })
        .catch(err => {
          console.error('Token save error:', err);
        });
    }
    
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get download token (for frontend polling)
app.post('/api/get-download-token', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(body.toString())
      .digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
      console.log('Payment signature verification failed');
      console.log('Expected:', expectedSignature);
      console.log('Received:', razorpay_signature);
      return res.status(400).json({ error: 'Payment verification failed' });
    }
    
    // Look for existing token
    let tokenDoc = await DownloadToken.findOne({ 
      razorpayPaymentId: razorpay_payment_id 
    });
    
    // If no token exists, create one immediately
    if (!tokenDoc) {
      const downloadToken = uuidv4();
      tokenDoc = new DownloadToken({
        token: downloadToken,
        razorpayPaymentId: razorpay_payment_id,
        cloudinaryUrl: process.env.CLOUDINARY_RESUME_URL || 'https://example.com/resume.pdf'
      });
      
      try {
        await tokenDoc.save();
        console.log('Download token created immediately:', downloadToken);
      } catch (err) {
        console.error('Token save error:', err);
        // If MongoDB is not available, return a temporary token
        return res.json({ 
          token: downloadToken,
          temporary: true,
          message: 'Token created (database not available)'
        });
      }
    }
    
    res.json({ token: tokenDoc.token });
  } catch (error) {
    console.error('Token retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve token' });
  }
});

// Validate token and provide download URL
app.get('/api/validate-token/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const tokenDoc = await DownloadToken.findOne({ token });
    
    if (!tokenDoc) {
      // For development/testing, provide a fallback download URL
      console.log('Token not found in database, providing fallback URL');
      return res.json({ 
        downloadUrl: process.env.CLOUDINARY_RESUME_URL || 'https://example.com/resume.pdf',
        message: 'Download ready (development mode)'
      });
    }
    
    if (tokenDoc.used) {
      return res.status(410).json({ error: 'Download link already used' });
    }
    
    // Check if token is expired (additional check beyond MongoDB TTL)
    const now = new Date();
    const tokenAge = now - tokenDoc.createdAt;
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (tokenAge > twentyFourHours) {
      return res.status(410).json({ error: 'Download link expired' });
    }
    
    // Mark token as used (optional - remove if multiple downloads allowed)
    // tokenDoc.used = true;
    // await tokenDoc.save();
    
    res.json({ 
      downloadUrl: tokenDoc.cloudinaryUrl,
      message: 'Download ready'
    });
  } catch (error) {
    console.error('Token validation error:', error);
    // For development, provide fallback URL even on error
    res.json({ 
      downloadUrl: process.env.CLOUDINARY_RESUME_URL || 'https://example.com/resume.pdf',
      message: 'Download ready (fallback mode)'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  
  if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'rzp_test_dummy') {
    console.log('⚠️  WARNING: Using dummy Razorpay credentials. Payments will not work.');
    console.log('   Please set up your .env file with real Razorpay credentials.');
  }
  
  if (!process.env.MONGODB_URI) {
    console.log('⚠️  WARNING: MongoDB URI not set. Database features will not work.');
    console.log('   Please set MONGODB_URI in your .env file.');
  }
});