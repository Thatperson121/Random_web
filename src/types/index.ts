export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ComponentType;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  playUrl: string;
  technologies: string[];
}

export type ThemeMode = 'light' | 'dark';