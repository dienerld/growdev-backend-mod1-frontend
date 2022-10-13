import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#EDDBDC',
      secondary: '#fff',
    },
    background: {
      default: '#EDDBDC',
      primary: '#796162',
    },
    warning: {
      main: '#FDFF94',
    },
    error: {
      main: '#FD7179',
    },
  },
});
