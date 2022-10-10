import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { useSelector } from 'react-redux';
import { typeReducers } from '@redux/modules/rootReducer';
import { getTheme } from '@styles/themes';

import { Private } from '@pages/Private';
import { Login, Public } from '@pages/Public';

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
        <Route path="/dashboard" element={<Private />}>
          <Route index element={<h1>Private</h1>} />
          <Route path="s" element={<h1>Private3213</h1>} />
        </Route>

        <Route path="/" element={<Public />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </ThemeProvider>
  );
}
