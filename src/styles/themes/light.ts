import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#000000',
      secondary: '#EDDBDC',
    },
    primary: {
      main: '#262021',
    },
    secondary: {
      main: '#EDDBDC',
    },
    background: {
      paper: '#796162',
      default: '#eddbdc',
    },
    custom: {
      icons: {
        delete: '#FD7179',
        edit: '#FDFF94',
        clock: '#000000',
      },
    },
  },
});
