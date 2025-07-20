# Setup Guide - Fix the Razorpay Configuration Error

## Current Error
You're getting this error because the Razorpay configuration is missing:
```
Error: `key_id` or `oauthToken` is mandatory
```

## Solution

### 1. Create Backend Environment File
Create a file called `.env` in the `backend` directory with the following content:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_resume

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# File Storage
CLOUDINARY_RESUME_URL=https://res.cloudinary.com/your-cloud/raw/upload/v1/resume.pdf

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 2. Create Frontend Environment File
Create a file called `.env.local` in the root directory with:

```env
# Razorpay Configuration (Public Key)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Get Razorpay Credentials

1. **Sign up for Razorpay**: Go to [razorpay.com](https://razorpay.com) and create an account
2. **Get Test Keys**: In your Razorpay dashboard, go to Settings > API Keys
3. **Copy the keys**:
   - Key ID (starts with `rzp_test_` for test mode)
   - Key Secret (starts with `test_` for test mode)

### 4. Set Up MongoDB

1. **Create MongoDB Atlas account**: Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create a cluster** and get your connection string
3. **Replace the MONGODB_URI** in your `.env` file

### 5. Set Up Cloudinary (Optional for testing)

1. **Sign up for Cloudinary**: Go to [cloudinary.com](https://cloudinary.com)
2. **Upload your resume** and get the URL
3. **Replace CLOUDINARY_RESUME_URL** in your `.env` file

### 6. Test the Setup

After setting up the environment variables:

```bash
# Start the backend
cd backend
npm run dev

# In another terminal, start the frontend
npm run dev
```

## Test Payment Details (Razorpay Test Mode)
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: 123456

## Quick Fix for Immediate Testing

If you want to test the frontend without the backend, you can temporarily modify the backend server to use dummy values:

```javascript
// In backend/server.js, replace lines 58-61 with:
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});
```

This will allow the server to start, though payments won't work until you add real credentials.

## Current Status ✅

- ✅ Backend server is running on port 5000
- ✅ API endpoints are responding correctly
- ✅ Frontend can connect to backend
- ⚠️ Razorpay credentials need to be configured
- ⚠️ Frontend environment variables need to be set

## Next Steps to Fix Payment Error

1. **Create frontend environment file**:
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. **Get Razorpay test credentials**:
   - Sign up at [razorpay.com](https://razorpay.com)
   - Go to Settings > API Keys
   - Copy the test Key ID (starts with `rzp_test_`)
   - Add it to your `.env.local` file

3. **Restart the frontend**:
   ```bash
   npm run dev
   ```

The payment system should work after these steps! 