// styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#8c52ff',
    primaryDark: '#6b3ac9',
    primaryLight: '#a57cff',
    background: '#121212',
    cardBackground: '#1e1e1e',
    inputBackground: '#2d2d2d',
    text: '#f5f5f5',
    textSecondary: '#b0b0b0',
    success: '#4caf50',
    successBackground: '#2c2f2c',
    error: '#f44336',
    errorDark: '#d32f2f',
    errorBackground: '#322',
    border: '#404040',
    disabled: '#555555'
  },
  shadows: {
    small: '0 2px 8px rgba(0,0,0,0.3)',
    medium: '0 4px 12px rgba(0,0,0,0.5)',
    large: '0 8px 24px rgba(0,0,0,0.6)'
  }
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
    font-size: 15px;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.cardBackground};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryLight};
  }
`;