import '@mui/material/styles';

declare module '@mui/material/styles' {
  // Example of how to extend the theme.
  export interface TypeBackground {
      primary: string;
      secondary: string;
    }
}
