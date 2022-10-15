import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#262021',
      paper: '#796162',
    },
    primary: {
      main: '#262021',
    },
    secondary: {
      main: '#EDDBDC',
    },
    text: {
      primary: '#ffffff',
      secondary: '#EDDBDC',
    },
    custom: {
      icons: {
        delete: '#FD7179',
        edit: '#FDFF94',
      },
    },
  },
});
