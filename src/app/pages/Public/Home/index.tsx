import {
  Box, Button, Grid, Typography, useTheme,
} from '@mui/material';
import bg from '@assets/a.svg';
import { shade } from 'polished';

export function Home() {
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box className="absolute top-0 grid grid-flow-col h-full w-full overflow-hidden">
      <Grid
        item
        className="grid-cols-12 sm:grid-cols-6 sm:bg-none"
        sx={{
          backgroundImage: `linear-gradient(90deg, ${theme.palette.background.default} 0%, rgba(217, 217, 217, 0) 90%), url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box className="flex flex-col flex-1 h-full items-center justify-center gap-10">
          <Box className="w-3/5 flex flex-col gap-10 justify-center items-center text-center">
            <Typography variant="body1" className="text-2xl sm:text-4xl">
              The best site to organize yourself!
            </Typography>
            <Typography variant="body1" className="text-2xl sm:text-4xl">
              Improve your day with our task manager!
            </Typography>
          </Box>
          <Box className="w-3/5 flex flex-col md:flex-row text-center gap-x-8 gap-y-6 items-center justify-center">
            <Button
              variant="contained"
              className="rounded-full normal-case"
              size="large"
              sx={{
                color: 'text.primary',
                backgroundColor: 'background.paper',
                '&:hover': {
                  color: isDark ? shade(1, theme.palette.text.primary) : 'text.secondary',
                  borderColor: { sm: 'text.primary' },
                  backgroundColor: shade(isDark ? -0.3 : 0.3, theme.palette.background.paper),
                },
              }}
            >
              Register Now
            </Button>
            <Button
              variant="outlined"
              className="rounded-full normal-case"
              size="large"
              sx={{
                color: { sm: 'text.primary' },
                borderColor: { sm: 'text.primary' },
                '&:hover': {
                  borderColor: { sm: shade(0.3, theme.palette.text.primary) },
                },
              }}
            >
              Sign In
            </Button>

          </Box>
        </Box>
      </Grid>
      <Grid item className="hidden sm:flex sm:grid-cols-6 h-full overflow-hidden">
        <Box
          sx={{
            backgroundImage: `linear-gradient(90deg, ${theme.palette.background.default} 0%, rgba(217, 217, 217, 0) 90%),url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
          }}
        />

      </Grid>
    </Box>
  );
}
