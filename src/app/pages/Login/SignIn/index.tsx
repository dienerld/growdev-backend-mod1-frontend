import { LockClosedIcon } from '@heroicons/react/20/solid';
import {
  Box, Button, Checkbox, FormControlLabel, Paper, TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';

type SignInProps = {
  handleFlip: () => void;
}

export function SignIn({ handleFlip }: SignInProps) {
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
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
                fullWidth
                InputProps={{
                  className: 'rounded-t-md border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-4',
                }}
              />

              <TextField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                InputProps={{
                  className: 'rounded-none rounded-b-md  border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
                }}
              />
            </div>

            <Box
              className="flex flex-col items-center justify-between sm:flex-row"
            >
              <FormControlLabel
                className="flex items-center mr-[0.2rem] sm:mr-0"
                control={<Checkbox value="remember" color="primary" />}
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
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </Box>

  );
}
