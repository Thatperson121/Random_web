import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Pause, Play, Square, Timer, Watch } from 'lucide-react';

type TimerMode = 'timer' | 'stopwatch';

export const TimerTool: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('timer');
  const [time, setTime] = useState(0); // in seconds
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'timer') {
          setTime((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(interval);
              setIsRunning(false);
              return 0;
            }
            return prevTime - 1;
          });
        } else {
          setTime((prevTime) => prevTime + 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return [hours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, '0'))
      .join(':');
  };

  const startTimer = () => {
    if (mode === 'timer' && time === 0) {
      const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
      if (totalSeconds > 0) {
        setTime(totalSeconds);
        setIsRunning(true);
      }
    } else {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    if (mode === 'stopwatch') {
      setLaps([]);
    }
  };

  const addLap = () => {
    if (mode === 'stopwatch' && isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  const switchMode = (newMode: TimerMode) => {
    resetTimer();
    setMode(newMode);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <Button
          variant={mode === 'timer' ? 'primary' : 'outline'}
          onClick={() => switchMode('timer')}
          icon={<Timer size={18} />}
        >
          Timer
        </Button>
        <Button
          variant={mode === 'stopwatch' ? 'primary' : 'outline'}
          onClick={() => switchMode('stopwatch')}
          icon={<Watch size={18} />}
        >
          Stopwatch
        </Button>
      </div>

      {mode === 'timer' && !isRunning && time === 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hours
            </label>
            <input
              type="number"
              min="0"
              max="99"
              value={inputHours}
              onChange={(e) => setInputHours(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minutes
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Seconds
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-center py-8">
        <div className="text-6xl font-mono text-center">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <Button
            variant="primary"
            onClick={startTimer}
            icon={<Play size={18} />}
          >
            {mode === 'timer' ? 'Start Timer' : 'Start Stopwatch'}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={pauseTimer}
            icon={<Pause size={18} />}
          >
            Pause
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={resetTimer}
          icon={<Square size={18} />}
        >
          Reset
        </Button>
        
        {mode === 'stopwatch' && (
          <Button
            variant="outline"
            onClick={addLap}
            disabled={!isRunning}
          >
            Lap
          </Button>
        )}
      </div>

      {mode === 'stopwatch' && laps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Laps
          </h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Lap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Split
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {laps.map((lapTime, index) => {
                  const splitTime = index === 0 ? lapTime : lapTime - laps[index - 1];
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {laps.length - index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                        {formatTime(lapTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                        {formatTime(splitTime)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};