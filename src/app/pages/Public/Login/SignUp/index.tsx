import React, { useEffect, useState } from 'react';
import validator from 'validator';

import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import {
  Alert,
  AlertColor,
  Box, Button, Paper, TextField,
} from '@mui/material';
import { axios } from '@/app/services/axios';

type SignUpProps = {
  handleFlip: () => void;
}

export function SignUp({ handleFlip }: SignUpProps) {
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationIsValid, setPasswordConfirmationIsValid] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState({ status: 'success', message: '' });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\s{1,}/, '');
    setName(input);

    validator.isAlpha(event.target.value, undefined, { ignore: ' ' })
      ? setNameIsValid(true)
      : setNameIsValid(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    validator.isEmail(event.target.value)
      ? setEmailIsValid(true)
      : setEmailIsValid(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    validator.isStrongPassword(event.target.value, { returnScore: true })
    >= 30 && event.target.value.length >= 5
      ? setPasswordIsValid(true)
      : setPasswordIsValid(false);
  };

  const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);

    event.target.value === password
      ? setPasswordConfirmationIsValid(true)
      : setPasswordConfirmationIsValid(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (async () => {
      try {
        const response = await axios.post('/users', {
          name,
          email,
          password,
          password_confirm: passwordConfirmation,
        });

        if (response.status === 201) {
          handleFlip();
        }
      } catch (err: any) {
        setHasError(true);
        if (err?.response.status === 400) {
          setError({ message: err?.response?.data?.error || err.message, status: 'warning' });
        } else {
          setError({ message: err?.response?.data?.error || err.message, status: 'error' });
        }
      }
    })();
  };

  useEffect(() => {
    if (
      nameIsValid && emailIsValid
      && passwordIsValid && passwordConfirmationIsValid
      && name && email && password && passwordConfirmation
    ) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [nameIsValid, emailIsValid, passwordIsValid, passwordConfirmation]);

  useEffect(() => {
    setHasError(false);
  }, [name, email, password, passwordConfirmation]);

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

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
              Sign up to your account
            </h2>
            <p className="mt-2 text-center text-sm">
              Or{' '}
              <button
                className="font-medium text-indigo-700 hover:text-indigo-600"
                onClick={handleFlip}
                type="button"
              >
                login in your account
              </button>
            </p>
          </div>
          <Alert
            severity={error.status as AlertColor}
            sx={{
              color: 'text.primary',
              display: hasError ? 'flex' : 'none',
            }}
          >{error.message || 'Internal Server error'}
          </Alert>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm">
              <TextField
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={handleNameChange}
                fullWidth
                error={!nameIsValid}
                helperText={nameIsValid ? '' : 'Name must be only letters and spaces'}
                className="mb-4"
                InputProps={{
                  className: 'rounded-md border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
                }}
              />

              <TextField
                id="email-register"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                error={!emailIsValid}
                helperText={emailIsValid ? '' : 'Email must be valid'}
                className="mb-4"
                InputProps={{
                  className: 'rounded-md border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
                }}
              />

              <TextField
                id="password-register"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={!passwordIsValid}
                helperText={passwordIsValid ? '' : 'Password must be at least 5 characters and contain at least one number, one lowercase and one uppercase letter'}
                fullWidth
                className="mb-4"
                InputProps={{
                  className: 'rounded-md border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
                }}
              />

              <TextField
                id="password-repeat"
                label="Password Confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                error={!passwordConfirmationIsValid}
                helperText={passwordConfirmationIsValid ? '' : 'Passwords must match'}
                fullWidth
                className="mb-4"
                InputProps={{
                  className: 'rounded-md border-gray-300 placeholder-gray-500 focus:z-10 sm:text-sm',
                }}
              />

            </div>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-30"
                disabled={!isSubmitting}
              >
                Sign Up
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
