import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Link } from '../ui/Link';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';
import { Button } from '../ui/Button';
import { featuredProjects } from '../../data/projects';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of my best work. These projects showcase my skills in web development,
            design, and problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              window.history.pushState({}, '', '/projects');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <CardImage src={project.imageUrl} alt={project.title} />
      <CardContent className="flex-grow">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="primary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link 
          href={project.demoUrl} 
          external 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          <span>Live Demo</span>
          <ExternalLink size={14} className="ml-1" />
        </Link>
        {project.githubUrl && (
          <Link 
            href={project.githubUrl} 
            external 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Github size={20} />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};