# Portfolio Website with Resume Purchase System

A modern, full-stack portfolio website with integrated Razorpay payment system for secure resume downloads.

## 🚀 Features

- **Modern Portfolio Design**: Responsive, animated UI with hero, skills, projects, and purchase sections
- **Secure Payment Integration**: Razorpay payment gateway with webhook verification
- **Token-Based Downloads**: Secure, time-limited download tokens (24-hour expiration)
- **MongoDB Integration**: Efficient token and payment tracking
- **Cloudinary Hosting**: Reliable file hosting for resume downloads
- **Production Ready**: Optimized for deployment on Vercel (frontend) and Render (backend)

## 🛠️ Tech Stack

### Frontend
- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **Razorpay SDK** for payments
- **Helmet** for security
- **CORS** for cross-origin requests

### Services
- **Razorpay** for payment processing
- **Cloudinary** for file hosting
- **MongoDB Atlas** for database hosting

## 📁 Project Structure

```
portfolio-resume-purchase/
├── app/                     # Next.js app directory
│   ├── page.tsx            # Homepage
│   ├── success/page.tsx    # Payment success page
│   ├── error/page.tsx      # Payment error page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── BuyResumeSection.tsx
│   └── ui/                # shadcn/ui components
├── backend/               # Express.js backend
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Razorpay account (test mode)
- Cloudinary account

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create `.env.local` with:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create `.env` with:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_resume
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   CLOUDINARY_RESUME_URL=https://res.cloudinary.com/your-cloud/raw/upload/v1/resume.pdf
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start backend server**:
   ```bash
   npm run dev
   ```

## 🔄 Payment Flow

1. **Order Creation**: Frontend requests order from `/api/create-order`
2. **Payment Processing**: Razorpay Checkout handles payment
3. **Webhook Verification**: Backend receives and verifies payment webhook
4. **Token Generation**: Secure download token created and stored
5. **Success Redirect**: User redirected to success page
6. **Token Polling**: Frontend polls for download token
7. **Download**: Token validated and Cloudinary URL provided

## 🔒 Security Features

- **Webhook Signature Verification**: All Razorpay webhooks verified
- **Payment Signature Validation**: Frontend payment responses validated
- **Token Expiration**: 24-hour automatic token expiration
- **One-time Use**: Optional token invalidation after download
- **CORS Protection**: Restricted cross-origin requests
- **Helmet Security**: Security headers and protections

## 📊 Database Schema

### DownloadTokens Collection
```javascript
{
  token: String,              // UUID v4 token
  razorpayPaymentId: String,  // Payment reference
  createdAt: Date,            // Auto-expires in 24 hours
  used: Boolean,              // Download status
  cloudinaryUrl: String       // File download URL
}
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repository
3. Configure environment variables
4. Set build command: `npm install`
5. Set start command: `npm start`

## 🧪 Testing

### Test Payment Details (Razorpay)
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: 123456

## 📝 API Endpoints

- `POST /api/create-order` - Create Razorpay order
- `POST /api/razorpay-webhook` - Handle payment webhooks
- `POST /api/get-download-token` - Get download token after payment
- `GET /api/validate-token/:token` - Validate and get download URL
- `GET /api/health` - Health check

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email john@example.com or create an issue in this repository.