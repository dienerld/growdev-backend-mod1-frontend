import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282424',
      btn: '#3c2e2e',
    },
    text: {
      primary: '#ffffff',
    },
  },
});
