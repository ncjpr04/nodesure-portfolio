'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Code, 
  Database, 
  Globe, 
  Layers, 
  Server, 
  Smartphone,
  Cloud,
  GitBranch
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'React & Next.js', icon: Code, description: 'Modern frontend frameworks', color: 'from-blue-500 to-cyan-500' },
  { name: 'Node.js & Express', icon: Server, description: 'Backend development', color: 'from-green-500 to-emerald-500' },
  { name: 'MongoDB & PostgreSQL', icon: Database, description: 'Database management', color: 'from-purple-500 to-violet-500' },
  { name: 'TypeScript', icon: Layers, description: 'Type-safe development', color: 'from-orange-500 to-red-500' },
  { name: 'AWS & Cloud', icon: Cloud, description: 'Cloud infrastructure', color: 'from-yellow-500 to-orange-500' },
  { name: 'Mobile Development', icon: Smartphone, description: 'React Native & PWA', color: 'from-pink-500 to-rose-500' },
  { name: 'DevOps & CI/CD', icon: GitBranch, description: 'Deployment automation', color: 'from-indigo-500 to-blue-500' },
  { name: 'Web Performance', icon: Globe, description: 'Optimization & SEO', color: 'from-teal-500 to-cyan-500' },
];

export function SkillsSection() {
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
    <section ref={sectionRef} id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-purple-200/20 blob-shape-2 opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-200/15 to-pink-200/15 blob-shape opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-6">
            <span className="text-sm text-gray-600 font-medium">Technical Expertise</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Skills & 
            <span className="font-normal italic"> Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Expertise across the full technology stack with a focus on modern, scalable solutions 
            that drive business growth and exceptional user experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={skill.name} 
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center relative">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${skill.color} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <skill.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className={`mt-24 grid md:grid-cols-3 gap-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-200/50">
            <div className="text-4xl font-light text-gray-900 mb-2">5+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-200/50">
            <div className="text-4xl font-light text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Projects Completed</div>
          </div>
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-200/50">
            <div className="text-4xl font-light text-gray-900 mb-2">20+</div>
            <div className="text-gray-600 font-medium">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}