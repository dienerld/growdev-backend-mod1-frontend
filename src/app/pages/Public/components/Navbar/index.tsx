import {
  AppBar, Box, Container,
  Toolbar, Typography, Switch,
} from '@mui/material';
import {
  Adb as AdbIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { setTheme } from '@redux/modules/theme';
import { typeReducers } from '@redux/modules/rootReducer';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const themeName = useAppSelector(
    (state: typeReducers) => state.theme,
  ) as 'light' | 'dark';

  const handleChangeTheme = () => {
    dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppBar
      position="static"
      className="bg-[#262021]   shadow-none "
    >
      <Container
        maxWidth={false}
      >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Welcome
          </Typography>

          {/* <= MD */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }} />
          <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Welcome
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
            className="justify-evenly mx-4"
          />

          <Box sx={{ flexGrow: 0 }}>
            <LightModeIcon className="text-sm" />
            <Switch
              size="small"
              onClick={handleChangeTheme}
              checked={themeName === 'dark'}
            />
            <DarkModeIcon className="text-sm" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
