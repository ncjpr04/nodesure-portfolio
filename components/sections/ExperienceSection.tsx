'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    company: 'Aucio Infotech',
    position: 'Software Engineer Intern',
    location: 'Jaipur, Rajasthan',
    duration: 'Feb 2025 -- Present',
    description: [
      'Engineered scalable and responsive front-end applications using React.js and Next.js, improving performance and SEO.',
      'Collaborated with UI/UX teams to enhance user experience, boosting user engagement across modules.'
    ],
    website: 'https://www.aucioinfotech.com/',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    company: 'AlignIt Games',
    position: 'Web Developer Intern',
    location: 'Jaipur, Rajasthan',
    duration: 'July 2024 -- Oct 2024',
    description: [
      'Implemented dynamic UIs with React.js and Next.js, achieving a 20% improvement in page load speed.',
      'Worked in an Agile environment with cross-functional teams to meet feature release deadlines and quality standards.'
    ],
    website: 'https://alignit1.netlify.app/',
    gradient: 'from-green-500 to-emerald-500'
  }
];

export function ExperienceSection() {
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
    <section ref={sectionRef} id="experience" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 blob-shape opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-200/15 to-purple-200/15 blob-shape-2 opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-6">
            <span className="text-sm text-gray-600 font-medium">Professional Journey</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Work
            <span className="font-normal italic"> Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            My professional experience in software development, focusing on modern web technologies 
            and collaborative team environments.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card 
              key={experience.company} 
              className={`group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                          {experience.position}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <a 
                              href={experience.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-gray-900 transition-colors duration-300 font-medium"
                            >
                              {experience.company}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {experience.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${experience.gradient}`}></div>
                          <span className="text-gray-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 