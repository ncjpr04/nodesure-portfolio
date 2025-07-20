// Copy this file to .env and fill in your actual values
// This is a template for the required environment variables

module.exports = {
  // MongoDB Connection
  MONGODB_URI: 'mongodb+srv://username:password@cluster.mongodb.net/portfolio_resume',
  
  // Razorpay Configuration
  RAZORPAY_KEY_ID: 'your_razorpay_key_id',
  RAZORPAY_KEY_SECRET: 'your_razorpay_key_secret',
  RAZORPAY_WEBHOOK_SECRET: 'your_webhook_secret',
  
  // File Storage
  CLOUDINARY_RESUME_URL: 'https://res.cloudinary.com/your-cloud/raw/upload/v1/resume.pdf',
  
  // Server Configuration
  PORT: 5000,
  FRONTEND_URL: 'http://localhost:3000'
}; 