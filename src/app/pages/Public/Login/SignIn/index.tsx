import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import {
  Box, Button, Checkbox,
  FormControlLabel, Paper, TextField,
} from '@mui/material';
import { useAppDispatch } from '../../../../store/hooks';
import { userActions } from '../../../../store/modules/user';
import { axios } from '../../../../services/axios';

type SignInProps = {
  handleFlip: () => void;
}

export function SignIn({ handleFlip }: SignInProps) {
  const redirect = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (validator.isEmail(event.target.value)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value.length >= 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (async () => {
      const { data } = await axios.post('/users/login', { email, password });
      dispatch(userActions.login({ token: data.token, remember: rememberMe }));
      redirect('/dashboard');
    })();
  };

  useEffect(() => {
    if (
      emailIsValid && passwordIsValid
      && email.length > 0 && password.length > 0
    ) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [emailIsValid, passwordIsValid, email, password]);

  return (
    <Box className="flex flex-1 justify-center content-center items-center">
      <Paper className="p-8 max-w-md w-full space-y-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <button
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleFlip}
                type="button"
              >
                create account
              </button>
            </p>
          </div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                error={!emailIsValid}
                helperText={emailIsValid ? '' : 'Please enter a valid email'}
                className="mb-4"
                InputProps={{
                  className: 'rounded-t-md border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
                }}
              />

              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                error={!passwordIsValid}
                helperText={passwordIsValid ? '' : 'Password must be at least 5 characters'}
                className="mb-4"
                InputProps={{
                  className: 'rounded-none rounded-b-md  border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
                }}
              />
            </div>

            <Box className="flex flex-col items-center justify-between sm:flex-row">
              <FormControlLabel
                className="flex items-center mr-[0.2rem] sm:mr-0"
                control={(
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={handleRememberMeChange}
                    checked={rememberMe}
                  />
              )}
                label="Remember me"
              />

              <Box className="text-sm">
                <Link
                  to="forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </Box>
            </Box>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-30"
                disabled={!isSubmitting}
              >
                Sign in
                <span className="flex items-center pl-3">
                  {!isSubmitting && (
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  )}

                  {isSubmitting && (
                    <LockOpenIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  )}
                </span>
              </Button>
            </div>
          </Box>
        </div>
      </Paper>
    </Box>

  );
}
