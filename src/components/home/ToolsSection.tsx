import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../ui/Link';
import { tools } from '../../data/tools';

export const ToolsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore these interactive tools I've built to solve common problems and showcase
            different technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tools.slice(0, 3).map((tool) => (
            <div
              key={tool.id}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                {React.createElement(tool.icon, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {tool.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {tool.description}
              </p>
              <Link
                href={`/tools#${tool.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <span>Try it out</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors duration-200"
          >
            Explore All Tools
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};