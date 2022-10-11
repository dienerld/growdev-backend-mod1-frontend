import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppBar, Box, Container, IconButton, Menu, Divider,
  MenuItem, Toolbar, Typography, Button, Avatar, Switch,
} from '@mui/material';
import {
  Adb as AdbIcon,
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { setTheme } from '@redux/modules/theme';
import { typeReducers } from '@redux/modules/rootReducer';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { userActions } from '@/app/redux/modules/user';

type HeaderProps = {
  pages?: string[];
  settings?: string[];
}

function customNormalize(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export const Navbar = ({ pages }: HeaderProps) => {
  const settings = ['My Profile'];
  const redirect = useNavigate();
  const dispatch = useAppDispatch();
  const themeName = useAppSelector((state: typeReducers) => state.theme) as 'light' | 'dark';

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChangeTheme = () => {
    dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(userActions.logout(null));
    redirect('/');
  };

  const { name } = useAppSelector((state: typeReducers) => state.user);
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
            Welcome, {name}
          </Typography>

          {/* <= MD */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            {pages && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"

              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages?.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    variant="body1"
                    textAlign="center"
                    className="text-inherit text-lg hover:bg-transparent hover:underline hover:decoration-solid "
                  >
                    <Link to={`/${customNormalize(page)}`}>
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1, position: 'absolute' }} />
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
            className="justify-evenly mx-4"
          >
            {pages?.map((page) => (
              <Button
                type="button"
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className="text-inherit font-bold text-lg hover:bg-transparent hover:underline hover:decoration-solid "
              >
                <Link to={`/${customNormalize(page)}`}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={(e) => (settings?.length ? handleOpenUserMenu(e) : null)}
              sx={{ p: 0 }}
              disabled={!settings?.length}
            >
              <Avatar alt="Remy Sharp" src={`https://robohash.org/${new Date().getMinutes()}`} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem className="flex">
                <Typography textAlign="center" className="mr-4">
                  Theme
                </Typography>
                <LightModeIcon
                  className="text-sm"
                />

                <Switch
                  size="small"
                  onClick={handleChangeTheme}
                  checked={themeName === 'dark'}
                />
                <DarkModeIcon
                  className="text-sm"
                />
              </MenuItem>
              {settings?.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to="/auth/profile">{setting}</Link>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
