import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282424',
      primary: '#3c2e2e',
      secondary: '#262021',
    },
    text: {
      primary: '#8c8b8b',
    },
    primary: {
      main: '#1dfbe5',
    },
  },
});
