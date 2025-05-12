import { Project } from '../types';

export const allProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Random Labs',
    description: 'An interactive coding playground featuring programming tutorials, code challenges, and learning resources for developers.',
    imageUrl: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'JavaScript', 'Education', 'Coding'],
    demoUrl: 'https://randomlabs.netlify.app',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Testimony Composer',
    description: 'Create and compose testimonies with an intuitive interface.',
    imageUrl: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'TypeScript', 'Productivity'],
    demoUrl: 'https://testimonycomposer.netlify.app',
    featured: true,
  }
];

export const featuredProjects = allProjects.filter(project => project.featured);