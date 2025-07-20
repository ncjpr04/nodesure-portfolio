'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['Next.js', 'PostgreSQL', 'Socket.io', 'Tailwind'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts, filters, and export functionality for business intelligence.',
    technologies: ['React', 'D3.js', 'Express', 'Redis'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-orange-500 to-red-600'
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
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gray-900/90 hover:bg-gray-900 text-white backdrop-blur-sm border-0 shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                    {project.title}
                  </h3>
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
          >
            View All Projects
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}