import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Router } from './router/Router';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;