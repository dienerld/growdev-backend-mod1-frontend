import {
  Box, Button, IconButton, InputAdornment, Paper, TextField, Typography, useTheme,
} from '@mui/material';
import {
  CloseRounded as CloseOutlinedIcon,
  Visibility as VisibilityOutlinedIcon,
  VisibilityOff as VisibilityOffOutlinedIcon,
} from '@mui/icons-material';
import validator from 'validator';
import { ChangeEvent, useState } from 'react';
import { shade } from 'polished';
import { useAppSelector } from '@/app/redux/hooks';

export function Profile() {
  const user = useAppSelector((state) => state.user);
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationIsValid, setPasswordConfirmationIsValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    validator.isStrongPassword(event.target.value, { returnScore: true })
    >= 30 && event.target.value.length >= 5
      ? setPasswordIsValid(true)
      : setPasswordIsValid(false);
  };

  const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);

    event.target.value === password
      ? setPasswordConfirmationIsValid(true)
      : setPasswordConfirmationIsValid(false);
  };
  return (
    <Box className="flex flex-1 flex-col items-center w-full gap-8">
      <Box className="flex flex-1 w-full items-center justify-between">
        <Typography variant="h4">
          Profile
        </Typography>
        <CloseOutlinedIcon />
      </Box>
      <Paper
        className="rounded-3xl w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 p-4"
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="flex flex-col items-center justify-center p-10 gap-4"
        >
          {/* Name */}
          <Box className="w-full">
            <Typography variant="body1" className="self-start" color="text.secondary">
              Name
            </Typography>
            <TextField
              value={user.name}
              className="w-full"
              InputProps={{
                className: 'rounded-xl bg-white h-10 text-black',
                sx: { '& input:focus': { boxShadow: 0 } },
              }}
            />
          </Box>

          {/* Email */}
          <Box className="w-full">
            <Typography variant="body1" className="self-start" color="text.secondary">
              Email
            </Typography>
            <TextField
              value={user.email}
              className="w-full"
              InputProps={{
                className: 'rounded-xl bg-white h-10 text-black',
                sx: { '& input:focus': { boxShadow: 0 } },
              }}
            />
          </Box>

          {/* Passwords */}
          <Box className="w-full flex flex-col sm:flex-row gap-x-10 gap-y-4">
            <Box className="w-full">
              <Typography variant="body1" className="self-start" color="text.secondary">
                Password
              </Typography>
              <TextField
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                error={!passwordIsValid}
                helperText={passwordIsValid ? '' : 'Password must be at least 5 characters and contain at least one number, one lowercase and one uppercase letter'}
                fullWidth
                InputProps={{
                  className: 'rounded-xl bg-white h-10 text-black',
                  sx: { '& input:focus': { boxShadow: 0 } },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="w-full">
              <Typography variant="body1" className="self-start" color="text.secondary">
                Confirm Password
              </Typography>
              <TextField
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                error={!passwordConfirmationIsValid}
                helperText={passwordConfirmationIsValid ? '' : 'Passwords must match'}
                fullWidth
                InputProps={{
                  className: 'rounded-xl bg-white h-10 text-black',
                  sx: { '& input:focus': { boxShadow: 0 } },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                        edge="end"
                      >
                        {
                          showPasswordConfirm
                            ? <VisibilityOutlinedIcon />
                            : <VisibilityOffOutlinedIcon />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Button */}
        <Box className="flex flex-1 items-center justify-center">
          <Button
            variant="contained"
            className="rounded-xl w-1/2 h-10 normal-case"
            sx={{
              backgroundColor: 'background.default',
              color: 'text.primary',
              '&:hover': { backgroundColor: shade(-0.2, theme.palette.background.default) },
            }}
          >
            Save
          </Button>

        </Box>
      </Paper>
    </Box>
  );
}
