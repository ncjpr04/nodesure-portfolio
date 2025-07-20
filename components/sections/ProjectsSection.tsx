'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'SkillSight',
    description: 'AI-powered LinkedIn profile analyzer that extracts, evaluates, and enhances user profiles for better career visibility using Python, Selenium, and Gemini AI.',
    technologies: ['Python', 'Selenium', 'Gemini AI', 'Next.js', 'Tailwind'],
    github: 'https://github.com/ncjpr04',
    demo: 'https://skills-sight.vercel.app/',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-blue-500 to-purple-600',
    status: 'In Progress'
  },
  {
    title: 'FitVerse',
    description: 'Decentralized fitness tracking application integrating smart contracts for goal-based token rewards using Solana blockchain technology.',
    technologies: ['Next.js', 'TypeScript', 'Rust', 'Solana', 'Anchor'],
    github: 'https://github.com/ncjpr04/bcryptexe',
    demo: 'https://github.com/ncjpr04/bcryptexe',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-green-500 to-teal-600',
    status: 'In Progress'
  },
  {
    title: 'TrueBalance',
    description: 'Personal finance management platform for tracking digital and fiat assets in real-time with authentication and analytics dashboards.',
    technologies: ['Next.js', 'Firebase', 'TypeScript', 'Shadcn UI'],
    github: 'https://github.com/ncjpr04',
    demo: 'https://truebalance1.vercel.app/',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    title: 'ReFoodify',
    description: 'Donation-based food distribution platform with automated task pipelines and secure donation workflows.',
    technologies: ['Next.js', 'Firebase', 'Shadcn UI', 'TypeScript'],
    github: 'https://github.com/ncjpr04',
    demo: 'https://refoodify.vercel.app/',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    title: 'Chatify',
    description: 'Real-time messaging application with WebSockets and dynamic routing for seamless communication.',
    technologies: ['Next.js', 'WebSockets', 'Real-time', 'UI/UX'],
    github: 'https://github.com/ncjpr04',
    demo: 'https://chatifyncjpr04.vercel.app/',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    title: 'Weather App',
    description: 'Live weather updates application using OpenWeatherMap API with modern UI and real-time data.',
    technologies: ['JavaScript', 'API Integration', 'Weather Data'],
    github: 'https://github.com/ncjpr04',
    demo: 'https://ncjpr04-weather-app.netlify.app/',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-yellow-500 to-orange-600'
  }
];

export function ProjectsSection() {
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

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="absolute top-40 left-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 blob-shape opacity-60"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/15 to-cyan-200/15 blob-shape-3 opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-6">
            <span className="text-sm text-gray-600 font-medium">Portfolio</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Featured
            <span className="font-normal italic"> Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            A showcase of my recent work demonstrating technical skills, creative problem-solving, 
            and attention to detail in building exceptional digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className={`group hover:shadow-2xl transition-all duration-700 overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 space-x-4">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm border-0 shadow-lg"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gray-900/90 hover:bg-gray-900 text-white backdrop-blur-sm border-0 shadow-lg"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-gray-200 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <Button 
            variant="outline"
            size="lg"
            className="px-8 py-4 rounded-full text-lg font-medium border-gray-300 hover:border-gray-400 transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://github.com/ncjpr04', '_blank')}
          >
            View All Projects
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}