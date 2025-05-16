import React, { useState, useEffect } from 'react';
import { HomePage } from '../pages/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ToolsPage } from '../pages/ToolsPage';
import { GamesPage } from '../pages/GamesPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Layout } from '../components/layout/Layout';
import { TowerDefense } from '../components/games/TowerDefense';

export const Router: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate events (browser back/forward navigation)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Update page title based on current path
  useEffect(() => {
    const pathTitles: Record<string, string> = {
      '/': 'Portfolio - Home',
      '/projects': 'Portfolio - Projects',
      '/tools': 'Portfolio - Tools',
      '/games': 'Portfolio - Games',
      '/contact': 'Portfolio - Contact',
    };

    document.title = pathTitles[currentPath] || 'Portfolio - Page Not Found';
  }, [currentPath]);

  // Render the appropriate component based on the current path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/projects':
        return <ProjectsPage />;
      case '/tools':
        return <ToolsPage />;
      case '/games':
        return <GamesPage />;
      case '/contact':
        return <ContactPage />;
      case '/games/tower-defense':
        return <TowerDefense />;
      default:
        return <NotFoundPage />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};