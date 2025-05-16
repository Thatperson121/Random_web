import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { Link } from '../ui/Link';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 z-0"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Creative <span className="text-blue-600 dark:text-blue-400">Developer</span> & 
              <span className="text-purple-600 dark:text-purple-400"> Designer</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Welcome to my portfolio. I create beautiful, functional websites, interactive tools, 
              and engaging games. Explore my work and let's build something amazing together.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                icon={<ArrowRight size={18} />}
                onClick={() => {
                  // Smooth scroll to projects section
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  // Scroll to contact section
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/10 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple-400/10 dark:bg-purple-700/20 rounded-full blur-3xl"></div>
            
            {/* Hero image container */}
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden aspect-square md:aspect-[4/3] max-w-lg mx-auto">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
                Portfolio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};