'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-200/20 to-orange-200/20 blob-shape opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-200/15 to-pink-200/15 blob-shape-2 opacity-50"></div>
      
      <Card className={`w-full max-w-lg bg-white/80 backdrop-blur-sm border-0 shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">Payment Failed</h1>
            <p className="text-gray-600 font-light leading-relaxed">
              We encountered an issue processing your payment or generating your download link.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-left">
            <h3 className="font-semibold text-red-800 mb-3">This could happen if:</h3>
            <ul className="space-y-2 text-sm text-red-700 font-light">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Payment was not verified successfully</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Download token is invalid or expired</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Resume has already been downloaded</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Network connectivity issues</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/'} 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="outline"
              className="w-full rounded-2xl py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-light">
              Need help? Contact us at{' '}
              <a href="mailto:john@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
                john@example.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}