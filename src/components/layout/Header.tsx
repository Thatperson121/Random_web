import React, { useState, useEffect } from 'react';
import { Link } from '../ui/Link';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Menu, X, Code, Terminal, Gamepad2 } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects', icon: <Code size={18} /> },
  { name: 'Tools', path: '/tools', icon: <Terminal size={18} /> },
  { name: 'Games', path: '/games', icon: <Gamepad2 size={18} /> },
  { name: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    setActivePath(window.location.pathname);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 font-bold text-xl md:text-2xl">
            <Link 
              href="/" 
              className="text-gray-900 dark:text-white flex items-center"
              onClick={() => setActivePath('/')}
            >
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                  activePath === item.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
                onClick={() => setActivePath(item.path)}
              >
                {item.icon && item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 w-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block px-3 py-4 rounded-md text-base font-medium ${
                activePath === item.path
                  ? 'text-blue-600 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={() => {
                setMobileMenuOpen(false);
                setActivePath(item.path);
              }}
            >
              <div className="flex items-center space-x-2">
                {item.icon && item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};