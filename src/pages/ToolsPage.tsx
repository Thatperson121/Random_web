import React, { useState, useRef, useEffect } from 'react';
import { tools } from '../data/tools';
import { Button } from '../components/ui/Button';

export const ToolsPage: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Parse hash from URL on initial load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tools.some(tool => tool.id === hash)) {
      setActiveToolId(hash);
      setTimeout(() => {
        toolRefs.current[hash]?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (tools.length > 0) {
      setActiveToolId(tools[0].id);
    }
  }, []);

  return (
    <div className="py-24 bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore these interactive tools I've built to solve common problems and showcase
            different technologies.
          </p>
        </div>

        {/* Tools Navigation */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={activeToolId === tool.id ? 'primary' : 'outline'}
                onClick={() => {
                  setActiveToolId(tool.id);
                  toolRefs.current[tool.id]?.scrollIntoView({ behavior: 'smooth' });
                  // Update URL hash without full page reload
                  window.history.pushState(null, '', `#${tool.id}`);
                }}
                icon={React.createElement(tool.icon, { size: 18 })}
              >
                {tool.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Content */}
        <div className="space-y-16">
          {tools.map((tool) => (
            <div
              key={tool.id}
              id={tool.id}
              ref={(el) => (toolRefs.current[tool.id] = el)}
              className={`transition-opacity duration-300 ${
                activeToolId === tool.id ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center">
                  <div className="mr-3 text-blue-600 dark:text-blue-400">
                    {React.createElement(tool.icon, { size: 24 })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {tool.title}
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {tool.description}
                  </p>
                  
                  {/* Actual tool component */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    {React.createElement(tool.component)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};