// App.js (main entry point)
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './views/Home';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;