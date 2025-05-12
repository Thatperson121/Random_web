import React from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { games } from '../../data/games';

export const GamesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Games Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Check out the interactive games I've developed. From casual to competitive,
            these games showcase my programming and design skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.slice(0, 2).map((game) => (
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
                  icon={<ArrowRight size={16} />}
                  onClick={() => {
                    window.open(game.playUrl, '_blank');
                  }}
                >
                  Play Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            icon={<Gamepad2 size={18} />}
            onClick={() => {
              window.history.pushState({}, '', '/games');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            View All Games
          </Button>
        </div>
      </div>
    </section>
  );
};