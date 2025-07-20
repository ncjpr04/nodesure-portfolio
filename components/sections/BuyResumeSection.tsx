'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Shield, Clock } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function BuyResumeSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 10000 }), // ₹100 in paise
      });

      const { orderId, amount, currency } = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'John Doe Portfolio',
        description: 'Premium Resume Download',
        order_id: orderId,
        handler: function (response: any) {
          // Redirect to success page with payment details
          const params = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          window.location.href = `/success?${params.toString()}`;
        },
        prefill: {
          name: 'Recruiter',
          email: 'recruiter@company.com',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
      alert('Failed to initialize payment. Please try again.');
    }
  };

  return (
    <section id="buy-resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get My Professional Resume</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download my comprehensive resume with detailed work experience, projects, and achievements
          </p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-gray-800">Premium Resume Package</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Complete professional profile with 5+ years of experience
            </CardDescription>
            <div className="text-4xl font-bold text-blue-600 mt-4">₹100</div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <Shield className="w-8 h-8 text-green-500 mx-auto" />
                <h3 className="font-semibold text-gray-800">Secure Download</h3>
                <p className="text-sm text-gray-600">SSL encrypted and token-based access</p>
              </div>
              <div className="text-center space-y-2">
                <Clock className="w-8 h-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold text-gray-800">24-Hour Access</h3>
                <p className="text-sm text-gray-600">Download window valid for 24 hours</p>
              </div>
              <div className="text-center space-y-2">
                <Download className="w-8 h-8 text-purple-500 mx-auto" />
                <h3 className="font-semibold text-gray-800">Instant Access</h3>
                <p className="text-sm text-gray-600">Immediate download after payment</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">What's Included:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Detailed work experience and achievements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Technical skills and certifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Project portfolio and case studies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Professional references and recommendations</span>
                </li>
              </ul>
            </div>

            <Button 
              onClick={handlePurchase}
              disabled={isLoading}
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold"
            >
              {isLoading ? 'Processing...' : 'Purchase & Download Resume - ₹100'}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Secure payment powered by Razorpay. Your download link will be available immediately after payment.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}