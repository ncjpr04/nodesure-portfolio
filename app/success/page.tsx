'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, Loader2 } from 'lucide-react';

export default function SuccessPage() {
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Download Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Preparing your download...</span>
            </div>
          ) : downloadToken ? (
            <>
              <p className="text-sm text-muted-foreground">
                Your resume is ready for download. This link will expire in 24 hours and can only be used once.
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}