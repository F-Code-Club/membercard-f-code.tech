import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
