'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['Next.js', 'PostgreSQL', 'Socket.io', 'Tailwind'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts, filters, and export functionality for business intelligence.',
    technologies: ['React', 'D3.js', 'Express', 'Redis'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export function ProjectsSection() {
  return (
    <section className="py-20 px-4 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work demonstrating technical skills and problem-solving abilities
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white border-0 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{project.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}