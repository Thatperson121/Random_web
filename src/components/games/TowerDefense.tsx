import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';

interface Enemy {
  x: number;
  y: number;
  health: number;
  speed: number;
  progress: number;
  type: 'basic' | 'fast' | 'tank';
}

interface Tower {
  x: number;
  y: number;
  damage: number;
  range: number;
  lastShot: number;
  fireRate: number;
  type: 'basic' | 'sniper' | 'splash';
}

export const TowerDefense: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(100);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [selectedTile, setSelectedTile] = useState<{ x: number; y: number } | null>(null);
  const [lives, setLives] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [wave, setWave] = useState(1);
  const [selectedTowerType, setSelectedTowerType] = useState<'basic' | 'sniper' | 'splash'>('basic');

  const TILE_SIZE = 40;
  const GRID_SIZE = 15;
  const PATH = [
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
    { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 4, y: 5 },
    { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 7, y: 6 },
    { x: 7, y: 7 }, { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 },
    { x: 10, y: 8 }, { x: 11, y: 8 }, { x: 12, y: 8 }, { x: 13, y: 8 },
    { x: 14, y: 8 }
  ];

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid and path
      drawGrid(ctx);
      drawPath(ctx);

      // Update and draw enemies
      updateEnemies();
      drawEnemies(ctx);

      // Update and draw towers
      updateTowers();
      drawTowers(ctx);

      // Check game over condition
      if (lives <= 0) {
        setGameOver(true);
        clearInterval(gameLoop);
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, enemies, towers, gameOver]);

  // Spawn enemies periodically
  useEffect(() => {
    if (gameStarted && !gameOver && enemies.length < wave * 5) {
      const spawnInterval = setInterval(() => {
        const enemyType = Math.random() < 0.7 ? 'basic' : Math.random() < 0.5 ? 'fast' : 'tank';
        const newEnemy: Enemy = {
          x: PATH[0].x * TILE_SIZE,
          y: PATH[0].y * TILE_SIZE,
          health: enemyType === 'tank' ? 200 + wave * 40 : enemyType === 'fast' ? 50 + wave * 10 : 100 + wave * 20,
          speed: enemyType === 'fast' ? 1.2 : enemyType === 'tank' ? 0.7 : 1,
          progress: 0,
          type: enemyType
        };
        setEnemies(prev => [...prev, newEnemy]);
      }, 2000);

      return () => clearInterval(spawnInterval);
    }
  }, [gameStarted, wave, gameOver]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        // Checkerboard pattern for grid
        ctx.fillStyle = (x + y) % 2 === 0 ? '#e5e5e5' : '#f5f5f5';
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  };

  const drawPath = (ctx: CanvasRenderingContext2D) => {
    PATH.forEach(point => {
      // Brown gradient for path
      const grad = ctx.createLinearGradient(
        point.x * TILE_SIZE,
        point.y * TILE_SIZE,
        (point.x + 1) * TILE_SIZE,
        (point.y + 1) * TILE_SIZE
      );
      grad.addColorStop(0, '#b97a57');
      grad.addColorStop(1, '#e0c097');
      ctx.fillStyle = grad;
      ctx.fillRect(point.x * TILE_SIZE, point.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      // Path border
      ctx.strokeStyle = '#a0522d';
      ctx.strokeRect(point.x * TILE_SIZE, point.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
  };

  const updateEnemies = () => {
    if (!gameStarted || gameOver) return;
    setEnemies(prev => prev.filter(enemy => {
      // Move enemy along path
      enemy.progress += enemy.speed;
      const pathIndex = Math.floor(enemy.progress);
      
      if (pathIndex >= PATH.length) {
        setLives(prev => prev - 1);
        return false;
      }

      const currentPoint = PATH[pathIndex];
      const nextPoint = PATH[Math.min(pathIndex + 1, PATH.length - 1)];
      
      const progress = enemy.progress - pathIndex;
      enemy.x = (currentPoint.x + (nextPoint.x - currentPoint.x) * progress) * TILE_SIZE;
      enemy.y = (currentPoint.y + (nextPoint.y - currentPoint.y) * progress) * TILE_SIZE;

      return enemy.health > 0;
    }));
  };

  const drawEnemies = (ctx: CanvasRenderingContext2D) => {
    enemies.forEach(enemy => {
      // All enemies move at a visually normal pace
      // (speed values in spawn logic should be 0.7, 1, 1.3 for tank, basic, fast)
      ctx.save();
      ctx.translate(enemy.x + 20, enemy.y + 20);
      if (enemy.type === 'tank') {
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#6d3a7b';
        ctx.stroke();
      } else if (enemy.type === 'fast') {
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.moveTo(-12, 12);
        ctx.lineTo(0, -14);
        ctx.lineTo(12, 12);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#b36b00';
        ctx.stroke();
      } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(-12, -12, 24, 24);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#7a2323';
        ctx.strokeRect(-12, -12, 24, 24);
      }
      ctx.restore();
      // Health bar
      ctx.fillStyle = 'black';
      ctx.fillRect(enemy.x, enemy.y - 5, TILE_SIZE, 3);
      ctx.fillStyle = 'green';
      ctx.fillRect(
        enemy.x,
        enemy.y - 5,
        (enemy.health / (enemy.type === 'tank' ? 200 + wave * 40 : enemy.type === 'fast' ? 50 + wave * 10 : 100 + wave * 20)) * TILE_SIZE,
        3
      );
    });
  };

  const updateTowers = () => {
    const now = Date.now();
    towers.forEach(tower => {
      if (now - tower.lastShot >= tower.fireRate) {
        // Find closest enemy in range
        let closestEnemy: Enemy | null = null;
        let closestDistance = tower.range;

        enemies.forEach(enemy => {
          const distance = Math.sqrt(
            Math.pow((enemy.x + TILE_SIZE/2) - (tower.x + TILE_SIZE/2), 2) +
            Math.pow((enemy.y + TILE_SIZE/2) - (tower.y + TILE_SIZE/2), 2)
          );

          if (distance <= closestDistance) {
            closestDistance = distance;
            closestEnemy = enemy;
          }
        });

        if (closestEnemy) {
          closestEnemy.health -= tower.damage;
          tower.lastShot = now;

          if (closestEnemy.health <= 0) {
            setScore(prev => prev + 10);
            setMoney(prev => prev + 5);
          }
        }
      }
    });
  };

  const drawTowers = (ctx: CanvasRenderingContext2D) => {
    towers.forEach(tower => {
      ctx.save();
      ctx.translate(tower.x + 20, tower.y + 20);
      if (tower.type === 'basic') {
        ctx.fillStyle = 'blue';
        ctx.fillRect(-15, -15, 30, 30);
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 2;
        ctx.strokeRect(-15, -15, 30, 30);
      } else if (tower.type === 'sniper') {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(16, 16);
        ctx.lineTo(-16, 16);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#065f46';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (tower.type === 'splash') {
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE) * TILE_SIZE;
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE) * TILE_SIZE;

    // Check if clicked on path
    if (PATH.some(point => point.x * TILE_SIZE === x && point.y * TILE_SIZE === y)) {
      return;
    }

    setSelectedTile({ x, y });
  };

  const buildTower = () => {
    if (!selectedTile || money < 50) return;

    const newTower: Tower = {
      x: selectedTile.x,
      y: selectedTile.y,
      damage: selectedTowerType === 'sniper' ? 50 : selectedTowerType === 'splash' ? 30 : 20,
      range: selectedTowerType === 'sniper' ? 200 : selectedTowerType === 'splash' ? 150 : 100,
      lastShot: Date.now(),
      fireRate: selectedTowerType === 'sniper' ? 2000 : selectedTowerType === 'splash' ? 1500 : 1000,
      type: selectedTowerType
    };

    setTowers(prev => [...prev, newTower]);
    setMoney(prev => prev - 50);
    setSelectedTile(null);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setMoney(100);
    setLives(10);
    setWave(1);
    setEnemies([]);
    setTowers([]);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full max-w-[600px] mb-4">
        <div className="text-lg">Score: {score}</div>
        <div className="text-lg">Money: ${money}</div>
        <div className="text-lg">Lives: {lives}</div>
        <div className="text-lg">Wave: {wave}</div>
      </div>

      {!gameStarted || gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {gameOver ? 'Game Over!' : 'Tower Defense'}
          </h2>
          <Button onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * TILE_SIZE}
            height={GRID_SIZE * TILE_SIZE}
            onClick={handleCanvasClick}
            className="border border-gray-300 dark:border-gray-600"
          />
          <div className="mt-4 flex space-x-4">
            <Button onClick={() => setSelectedTowerType('basic')} variant={selectedTowerType === 'basic' ? 'primary' : 'outline'}>
              Basic Tower
            </Button>
            <Button onClick={() => setSelectedTowerType('sniper')} variant={selectedTowerType === 'sniper' ? 'primary' : 'outline'}>
              Sniper Tower
            </Button>
            <Button onClick={() => setSelectedTowerType('splash')} variant={selectedTowerType === 'splash' ? 'primary' : 'outline'}>
              Splash Tower
            </Button>
          </div>
          {selectedTile && (
            <Button onClick={buildTower} className="mt-4">
              Build Tower
            </Button>
          )}
        </div>
      )}
    </div>
  );
};