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

const skills = [
  { name: 'React & Next.js', icon: Code, description: 'Modern frontend development' },
  { name: 'Node.js & Express', icon: Server, description: 'Backend API development' },
  { name: 'MongoDB & PostgreSQL', icon: Database, description: 'Database design & optimization' },
  { name: 'TypeScript', icon: Layers, description: 'Type-safe development' },
  { name: 'AWS & Cloud', icon: Cloud, description: 'Cloud infrastructure & deployment' },
  { name: 'Mobile Development', icon: Smartphone, description: 'React Native & PWA' },
  { name: 'DevOps & CI/CD', icon: GitBranch, description: 'Automated deployment pipelines' },
  { name: 'Web Performance', icon: Globe, description: 'Optimization & best practices' },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Technical Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expertise across the full technology stack with a focus on modern, scalable solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card 
              key={skill.name} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}