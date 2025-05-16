import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { ToolsSection } from '../components/home/ToolsSection';
import { GamesSection } from '../components/home/GamesSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProjects />
      <ToolsSection />
      <GamesSection />
      <ContactSection />
    </div>
  );
};