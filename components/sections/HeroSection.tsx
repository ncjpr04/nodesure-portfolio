'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuyResume = () => {
    document.getElementById('buy-resume')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background with organic shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated blob shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 blob-shape opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-200/20 to-pink-200/20 blob-shape-2 opacity-50"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-200/20 to-blue-200/20 blob-shape-3 opacity-40"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className={`text-xl md:text-2xl font-bold text-gray-800 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            Nitin Choudhary
          </div>
          <div className={`hidden md:flex items-center space-x-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <button 
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
            >
              Skills
            </button>
            <button 
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
            >
              Experience
            </button>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
            >
              Projects
            </button>
            <button 
              onClick={scrollToBuyResume}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
            >
              Resume
            </button>
            <Button 
              onClick={scrollToBuyResume}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="space-y-6 md:space-y-8">
          <div className={`space-y-4 md:space-y-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Available for hire</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-tight">
              Full-Stack
              <br />
              <span className="font-normal italic">Developer</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg font-light">
              Passionate about creating innovative digital solutions with modern technologies. 
              Specialized in React, Next.js, and blockchain development.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Jaipur, Rajasthan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">nitinchoudhary22112004@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={scrollToBuyResume}
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-bounce" />
              Get Resume - ₹100
            </Button>
            <Button 
              onClick={scrollToSkills}
              variant="outline" 
              size="lg"
              className="px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium border-gray-300 hover:border-gray-400 transition-all duration-300 hover:scale-105 group"
            >
              View Work
              <ArrowDown className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
          </div>

          <div className={`flex items-center space-x-3 md:space-x-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <a 
              href="https://github.com/ncjpr04" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </a>
            <a 
              href="https://www.linkedin.com/in/ncjpr04/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </a>
            <a 
              href="https://www.leetcode.com/ncjpr04"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            >
              <span className="text-sm md:text-lg font-bold text-gray-700">LC</span>
            </a>
            <a 
              href="https://bento.me/ncjpr04"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </a>
            <a 
              href="mailto:nitinchoudhary22112004@gmail.com"
              className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </a>
          </div>
        </div>

        {/* Right side - Visual element */}
        <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
            {/* Main profile area */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img 
                  src="/profile-pic.JPG" 
                  alt="Nitin Choudhary" 
                  className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-2xl md:rounded-3xl shadow-2xl animate-float"
                />
              </div>
            </div>
            
            {/* Floating elements - hidden on mobile, visible on larger screens */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
              <span className="text-xl">🚀</span>
            </div>
            <div className="absolute top-1/4 -left-6 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
              <span className="text-lg">💡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}