import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Copy, RefreshCcw, Shield } from 'lucide-react';

export const PasswordGeneratorTool: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  // Generate password on initial load and when options change
  useEffect(() => {
    generatePassword();
  }, [length, options]);

  // Calculate password strength
  useEffect(() => {
    let score = 0;
    
    // Length score (0-4)
    if (length > 4) score += 1;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    
    // Character variety score (0-4)
    if (options.lowercase) score += 1;
    if (options.uppercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 1;
    
    // Normalize to 0-100
    setStrength(Math.min(Math.round((score / 8) * 100), 100));
  }, [password, length, options]);

  const generatePassword = () => {
    let charset = '';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Ensure at least one charset is selected
    if (charset === '') {
      setPassword('Select at least one option');
      return;
    }
    
    let result = '';
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const getStrengthColor = () => {
    if (strength < 25) return 'bg-red-500';
    if (strength < 50) return 'bg-orange-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
          <div className="w-full overflow-x-auto font-mono text-lg">
            {password}
          </div>
          <Button
            variant="ghost"
            onClick={copyToClipboard}
            className="ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-label="Copy to clipboard"
          >
            <Copy size={20} />
          </Button>
        </div>
        {copied && (
          <div className="absolute -top-2 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Copied!
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>Password length: {length}</span>
            <span className="flex items-center text-xs">
              <Shield size={14} className="mr-1" />
              <span>Strength: </span>
              <span className={`ml-1 font-medium ${
                strength < 25 ? 'text-red-500' : 
                strength < 50 ? 'text-orange-500' : 
                strength < 75 ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {getStrengthLabel()}
              </span>
            </span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
            <div
              className={`h-1.5 rounded-full ${getStrengthColor()}`}
              style={{ width: `${strength}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="uppercase"
              checked={options.uppercase}
              onChange={() => handleOptionChange('uppercase')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="uppercase" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Uppercase Letters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowercase"
              checked={options.lowercase}
              onChange={() => handleOptionChange('lowercase')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="lowercase" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Lowercase Letters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={options.numbers}
              onChange={() => handleOptionChange('numbers')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="numbers" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="symbols"
              checked={options.symbols}
              onChange={() => handleOptionChange('symbols')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="symbols" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Symbols
            </label>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={generatePassword}
          className="w-full"
          icon={<RefreshCcw size={16} />}
        >
          Generate New Password
        </Button>
      </div>
    </div>
  );
};