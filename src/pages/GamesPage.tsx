import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Gamepad2, X } from 'lucide-react';
import { games } from '../data/games';
import { Game } from '../types';

export const GamesPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  return (
    <div className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Games Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Check out the interactive games I've developed. From casual to competitive,
            these games showcase my programming and design skills.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card key={game.id} hoverable className="overflow-hidden">
              <div className="relative">
                <CardImage src={game.imageUrl} alt={game.title} className="h-64" />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                  <Gamepad2 size={16} className="mr-1" />
                  <span className="text-sm font-medium">Game</span>
                </div>
              </div>
              <CardContent>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription className="mt-2">{game.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {game.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setActiveGame(game)}
                >
                  Play Game
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Game Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeGame.title}
                </h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setActiveGame(null)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-auto">
                <iframe
                  src={activeGame.playUrl}
                  title={activeGame.title}
                  className="w-full h-[70vh]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};