import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Copy, RefreshCcw } from 'lucide-react';

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
}

export const ColorPickerTool: React.FC = () => {
  const [mainColor, setMainColor] = useState<string>('#3B82F6');
  const [palette, setPalette] = useState<Color[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Generate complementary colors for the palette
  useEffect(() => {
    if (!mainColor) return;

    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const rgb = hexToRgb(mainColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Generate variations
    const variations: Color[] = [];
    
    // Add the main color
    variations.push({
      hex: mainColor,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
    });

    // Add lighter and darker variations
    for (let i = 1; i <= 4; i++) {
      // Lighter
      const lighterHsl = { ...hsl, l: Math.min(hsl.l + i * 10, 100) };
      const lighterRgb = hslToRgb(lighterHsl.h, lighterHsl.s, lighterHsl.l);
      const lighterHex = rgbToHex(lighterRgb.r, lighterRgb.g, lighterRgb.b);
      
      // Darker
      const darkerHsl = { ...hsl, l: Math.max(hsl.l - i * 10, 0) };
      const darkerRgb = hslToRgb(darkerHsl.h, darkerHsl.s, darkerHsl.l);
      const darkerHex = rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b);
      
      variations.push({
        hex: lighterHex,
        rgb: `rgb(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b})`,
        hsl: `hsl(${Math.round(lighterHsl.h)}, ${Math.round(lighterHsl.s)}%, ${Math.round(lighterHsl.l)}%)`,
      });
      
      variations.unshift({
        hex: darkerHex,
        rgb: `rgb(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b})`,
        hsl: `hsl(${Math.round(darkerHsl.h)}, ${Math.round(darkerHsl.s)}%, ${Math.round(darkerHsl.l)}%)`,
      });
    }

    setPalette(variations);
  }, [mainColor]);

  // Helper function to convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Helper function to convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  // Generate a random color
  const generateRandomColor = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setMainColor(randomHex);
  };

  // Copy color to clipboard
  const copyToClipboard = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(`${type}: ${value}`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div>
          <label htmlFor="colorPicker" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select a color:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              id="colorPicker"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              className="h-10 w-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <Button
          onClick={generateRandomColor}
          variant="outline"
          icon={<RefreshCcw size={16} />}
          className="mt-4 sm:mt-0"
        >
          Random Color
        </Button>
      </div>

      {/* Color palette */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {palette.map((color, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-transform hover:shadow-md"
          >
            <div
              className="h-24 w-full"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="p-4 space-y-2">
              {['hex', 'rgb', 'hsl'].map((format) => (
                <div key={format} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {format}:
                  </span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                      {color[format as keyof Color]}
                    </code>
                    <button
                      onClick={() => copyToClipboard(color[format as keyof Color], format.toUpperCase())}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Copy notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Copied {copied} to clipboard
        </div>
      )}
    </div>
  );
};