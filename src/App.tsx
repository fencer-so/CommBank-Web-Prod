import React from 'react';
import { ThemeProvider } from "styled-components";
import './App.scss';
import { useAppSelector } from './app/hooks';
import { GlobalStyle } from './components/GlobalStyles';
import { DarkTheme, LightTheme } from './components/Theme';
import { selectMode } from './features/themeswitcher/themeSlice';
import './font.scss';
import Main from './pages/Main';



function App() {
  const mode = useAppSelector(selectMode);



  return (

    <ThemeProvider theme={mode === 'light' ? LightTheme : DarkTheme}>
      <GlobalStyle />

      <Main />

    </ThemeProvider>

  );
}

export default App;