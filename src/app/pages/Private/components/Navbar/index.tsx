import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppBar, Box, Container, IconButton, Menu, Divider,
  MenuItem, Toolbar, Typography, Avatar, Switch,
} from '@mui/material';
import {
  Adb as AdbIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { typeReducers } from '@redux/modules/rootReducer';
import { setTheme } from '@redux/modules/theme';
import { userActions } from '@redux/modules/user';
import { taskActions } from '@redux/modules/tasks';

type HeaderProps = {
  settings: string[];
}

export const Navbar = ({ settings }: HeaderProps) => {
  const redirect = useNavigate();
  const dispatch = useAppDispatch();
  const themeName = useAppSelector((state: typeReducers) => state.theme) as 'light' | 'dark';

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
    dispatch(taskActions.clearTasks());
    redirect('/');
  };

  const { name } = useAppSelector((state: typeReducers) => state.user);
  return (
    <AppBar
      position="static"
      className="shadow-none"
    >
      <Container
        maxWidth={false}
      >
        <Toolbar
          disableGutters
          className="flex flex-grow flex-1 items-center justify-between "
        >
          <Box className="flex items-center">
            <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
            <Link to="/" className="hidden sm:block mr-2 text-white text-xl flex-nowrap font-bold  tracking-[0.2rem]">
              Welcome, {name}
            </Link>

          </Box>

          {/* <= MD */}
          <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1, position: 'absolute' }} />
          <Box>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <Avatar alt={name} src={`https://robohash.org/${new Date().getMinutes()}`} />
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
              <MenuItem key="profile" onClick={handleCloseUserMenu}>
                <Link to="/auth/profile">My Profile</Link>
              </MenuItem>
              {settings?.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={setting}>{setting}</Link>
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
