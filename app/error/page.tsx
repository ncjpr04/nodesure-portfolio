'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-red-600">Payment Failed</CardTitle>
          <CardDescription>
            We encountered an issue processing your payment or generating your download link.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>This could happen if:</p>
            <ul className="text-left list-disc list-inside">
              <li>Payment was not verified</li>
              <li>Download token is invalid or expired</li>
              <li>Resume has already been downloaded</li>
            </ul>
          </div>
          <Button onClick={() => window.location.href = '/'} className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}