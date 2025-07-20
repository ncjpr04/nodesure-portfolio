'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Loader2, ArrowLeft } from 'lucide-react';

export default function SuccessPage() {
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsVisible(true);
    
    const paymentId = searchParams.get('razorpay_payment_id');
    const orderId = searchParams.get('razorpay_order_id');
    const signature = searchParams.get('razorpay_signature');

    if (!paymentId || !orderId || !signature) {
      setError('Payment verification failed. Please contact support.');
      setIsLoading(false);
      return;
    }

    // Poll for download token
    const pollForToken = async () => {
      try {
        const response = await fetch('/api/get-download-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
          }),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          setDownloadToken(data.token);
          setIsLoading(false);
        } else if (data.status === 'pending') {
          // Continue polling
          setTimeout(pollForToken, 2000);
        } else {
          setError(data.message || 'Failed to generate download token');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Network error. Please try again.');
        setIsLoading(false);
      }
    };

    pollForToken();
  }, [searchParams]);

  const handleDownload = async () => {
    if (!downloadToken) return;

    try {
      const response = await fetch(`/api/validate-token/${downloadToken}`);
      const data = await response.json();

      if (response.ok && data.downloadUrl) {
        // Redirect to Cloudinary URL
        window.location.href = data.downloadUrl;
      } else {
        setError(data.message || 'Download failed');
      }
    } catch (err) {
      setError('Download failed. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-200/20 to-orange-200/20 blob-shape opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-200/15 to-pink-200/15 blob-shape-2 opacity-50"></div>
        
        <Card className={`w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✕</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">Download Error</h1>
              <p className="text-gray-600 font-light leading-relaxed">{error}</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="outline"
              className="w-full rounded-2xl py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-200/20 to-blue-200/20 blob-shape opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-purple-200/15 blob-shape-2 opacity-50"></div>
      
      <Card className={`w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">Payment Successful!</h1>
            <p className="text-gray-600 font-light leading-relaxed">
              Your payment has been processed successfully.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 py-4">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-gray-700 font-medium">Preparing your download...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          ) : downloadToken ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-sm text-green-700 font-light leading-relaxed">
                  Your resume is ready for download. This link will expire in 24 hours.
                </p>
              </div>
              <Button 
                onClick={handleDownload} 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div>
          ) : null}

          <div className="pt-4 border-t border-gray-200">
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}