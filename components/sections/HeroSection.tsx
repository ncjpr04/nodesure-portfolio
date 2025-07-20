'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuyResume = () => {
    document.getElementById('buy-resume')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              John Doe
            </h1>
            <h2 className="text-2xl lg:text-3xl text-gray-700 font-medium">
              Full-Stack Developer
            </h2>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>john@example.com</span>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Passionate full-stack developer with 5+ years of experience building scalable web applications. 
            Specialized in React, Node.js, and cloud technologies. I love creating efficient solutions 
            that solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToBuyResume}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Buy Resume - ₹100
            </Button>
            <Button 
              onClick={scrollToSkills}
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-lg"
            >
              View My Work
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative w-80 h-80 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
              <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}