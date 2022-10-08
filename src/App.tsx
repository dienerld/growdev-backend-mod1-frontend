import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Home, Login } from './app/pages';
import { typeReducers } from './app/store/modules/rootReducer';
import { getTheme } from './styles/themes';

export function App() {
  const nameTheme = useSelector((state: typeReducers) => state.theme) as 'light' | 'dark';
  const [theme, setThemeState] = useState(getTheme(nameTheme));

  useEffect(() => {
    setThemeState(getTheme(nameTheme));
  }, [nameTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </ThemeProvider>
  );
}
