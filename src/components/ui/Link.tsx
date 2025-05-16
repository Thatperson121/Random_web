import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  href,
  className = '',
  children,
  external = false,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!external && href.startsWith('/')) {
      e.preventDefault();
      
      // Update the window history
      window.history.pushState({}, '', href);
      
      // Dispatch a popstate event to notify about the URL change
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <a
      href={href}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};