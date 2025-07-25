'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText, Shield, Clock, Check, Star } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const features = [
  { icon: Shield, title: 'Secure Download', description: 'SSL encrypted and token-based access' },
  { icon: Clock, title: '24-Hour Access', description: 'Download window valid for 24 hours' },
  { icon: Download, title: 'Instant Access', description: 'Immediate download after payment' },
];

const included = [
  'Detailed internship experience and achievements',
  'Technical skills and programming languages',
  'Project portfolio with live demos',
  'Education and academic performance',
  'DSA problem-solving achievements',
  'Contact information and social links'
];

export function BuyResumeSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // Create order on backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 10000 }), // ₹100 in paise
      });

      const { orderId, amount, currency } = await response.json();

      // Check if Razorpay key is available
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        throw new Error('Razorpay key not configured');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Nitin Choudhary Portfolio',
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
          color: '#1f2937',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      setIsLoading(false);
      
      // More specific error messages
      if (error.message?.includes('fetch')) {
        alert('Cannot connect to payment server. Please check if the backend is running.');
      } else if (error.message?.includes('order')) {
        alert('Failed to create payment order. Please try again.');
      } else if (error.message?.includes('Razorpay key not configured')) {
        alert('Payment system not configured. Please set up Razorpay credentials.');
      } else {
        alert('Failed to initialize payment. Please try again.');
      }
    }
  };

  return (
    <section ref={sectionRef} id="buy-resume" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-100">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-gray-200/30 to-blue-200/30 blob-shape opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 blob-shape-2 opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className={`text-center mb-12 md:mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-4 md:mb-6">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600 font-medium">Premium Resume</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 md:mb-6 leading-tight">
            Get My Professional
            <span className="font-normal italic"> Resume</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Download my comprehensive resume with detailed work experience, projects, and achievements. 
            Crafted for modern recruiters and ATS systems.
          </p>
        </div>

        <Card className={`bg-white/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left side - Features */}
              <div className="p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8">
                <div className="space-y-4 md:space-y-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg">
                    <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3">Premium Resume Package</h3>
                    <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
                      Complete professional profile with internship experience in full-stack development and modern web technologies.
                    </p>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl md:text-4xl font-light text-gray-900">₹100</span>
                    <span className="text-gray-500 line-through">₹200</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs md:text-sm font-medium">50% OFF</span>
                  </div>
                </div>

                <div className="grid gap-3 md:gap-4">
                  {features.map((feature, index) => (
                    <div key={feature.title} className="flex items-start space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{feature.title}</h4>
                        <p className="text-gray-600 text-xs md:text-sm font-light">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handlePurchase}
                  disabled={isLoading}
                  size="lg" 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Download className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-bounce" />
                      Purchase & Download Resume
                    </>
                  )}
                </Button>

                <p className="text-center text-xs md:text-sm text-gray-500 font-light">
                  Secure payment powered by Razorpay. Instant download after payment.
                </p>
                {!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && (
                  <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs md:text-sm text-yellow-700">
                      ⚠️ Development Mode: Add Razorpay credentials to enable payments
                    </p>
                  </div>
                )}
              </div>

              {/* Right side - What's included */}
              <div className="bg-gray-50/80 p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8">
                <div>
                  <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">What&apos;s Included</h4>
                  <div className="space-y-3 md:space-y-4">
                    {included.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                        </div>
                        <span className="text-sm md:text-base text-gray-700 font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200/50">
                  <h5 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Why Choose This Resume?</h5>
                  <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 font-light">
                    <li>• Professionally designed and formatted</li>
                    <li>• ATS-friendly for automated screening</li>
                    <li>• Includes internship achievements and projects</li>
                    <li>• Updated with latest technologies and skills</li>
                    <li>• Optimized for entry-level tech positions</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial */}
        <div className={`mt-12 md:mt-16 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200/50 max-w-2xl mx-auto">
            <div className="flex justify-center mb-3 md:mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm md:text-base text-gray-700 italic font-light leading-relaxed mb-3 md:mb-4">
              &ldquo;Nitin&apos;s resume perfectly showcased his technical skills and project experience. 
              The format was clean, professional, and made our hiring decision easy.&rdquo;
            </p>
            <div className="text-xs md:text-sm text-gray-600">
              <div className="font-medium">Sarah Johnson</div>
              <div>Senior Technical Recruiter, TechCorp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}