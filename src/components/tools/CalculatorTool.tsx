import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const CalculatorTool: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const clearAll = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const performOperation = (nextOperator: string) => {
    const nextValue = parseFloat(display);

    const operations: Record<string, (a: number, b: number) => number> = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '×': (a, b) => a * b,
      '÷': (a, b) => a / b,
      '=': (a, b) => b,
    };

    if (currentValue === null) {
      setCurrentValue(display);
    } else if (operator) {
      const currentValueNum = parseFloat(currentValue);
      const result = operations[operator](currentValueNum, nextValue);
      
      setDisplay(String(result));
      setCurrentValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
    setWaitingForOperand(true);
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
    setWaitingForOperand(true);
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg mb-2">
        <div className="text-right text-3xl font-mono truncate">
          {display}
        </div>
        <div className="text-right text-gray-500 dark:text-gray-400 text-sm mt-1">
          {currentValue && operator ? `${currentValue} ${operator}` : '\u00A0'}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {/* First row */}
        <button
          onClick={memoryClear}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          MC
        </button>
        <button
          onClick={memoryRecall}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          MR
        </button>
        <button
          onClick={memoryAdd}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          M+
        </button>
        <button
          onClick={memorySubtract}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          M-
        </button>
        
        {/* Second row */}
        <button
          onClick={clearAll}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          AC
        </button>
        <button
          onClick={clearEntry}
          className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded"
        >
          CE
        </button>
        <button
          onClick={inputPercent}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className={`${
            operator === '÷' ? 'bg-blue-600 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'
          } py-2 px-4 rounded`}
        >
          ÷
        </button>
        
        {/* Third row */}
        <button
          onClick={() => inputDigit('7')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          7
        </button>
        <button
          onClick={() => inputDigit('8')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          8
        </button>
        <button
          onClick={() => inputDigit('9')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          9
        </button>
        <button
          onClick={() => performOperation('×')}
          className={`${
            operator === '×' ? 'bg-blue-600 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'
          } py-2 px-4 rounded`}
        >
          ×
        </button>
        
        {/* Fourth row */}
        <button
          onClick={() => inputDigit('4')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          4
        </button>
        <button
          onClick={() => inputDigit('5')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          5
        </button>
        <button
          onClick={() => inputDigit('6')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          6
        </button>
        <button
          onClick={() => performOperation('-')}
          className={`${
            operator === '-' ? 'bg-blue-600 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'
          } py-2 px-4 rounded`}
        >
          -
        </button>
        
        {/* Fifth row */}
        <button
          onClick={() => inputDigit('1')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          1
        </button>
        <button
          onClick={() => inputDigit('2')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          2
        </button>
        <button
          onClick={() => inputDigit('3')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          3
        </button>
        <button
          onClick={() => performOperation('+')}
          className={`${
            operator === '+' ? 'bg-blue-600 text-white' : 'bg-blue-400 hover:bg-blue-500 text-white'
          } py-2 px-4 rounded`}
        >
          +
        </button>
        
        {/* Sixth row */}
        <button
          onClick={toggleSign}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          +/-
        </button>
        <button
          onClick={() => inputDigit('0')}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          0
        </button>
        <button
          onClick={inputDot}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          .
        </button>
        <button
          onClick={() => performOperation('=')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          =
        </button>
      </div>
    </div>
  );
};