/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwtDecode from 'jwt-decode';

type TAction = {
  token: string,
  user: {
    name: string,
    email: string,
  }
  remember: boolean,
}

const initialState = {
  name: undefined,
  email: undefined,
  token: undefined,
  remember: false,
};

type TJwtDecode = {
  exp: number;
  iat: number;
  id: string;
  name: string;
  email: string;
}

export const keySession = 'dnr-growdev-modbackend-user';

export const isLogged = createAsyncThunk(
  'users/isLogged',
  () => {
    const dataStorage = sessionStorage.getItem(`persist:${keySession}`);
    if (!dataStorage) {
      return false;
    }
    const data = JSON.parse(dataStorage);
    const { token } = data;
    if (
      typeof token !== 'string' || token === ''
          || token === 'undefined' || token === 'null'
    ) {
      return false;
    }

    const decoded = jwtDecode<TJwtDecode>(token);
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  },
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // @ts-expect-error
    login: (_, action: PayloadAction<TAction>) => {
      sessionStorage.setItem(`persist:${keySession}`, JSON.stringify(action.payload));
      const decoded = jwtDecode<TJwtDecode>(action.payload.token);
      if (decoded.exp * 1000 < Date.now()) {
        sessionStorage.removeItem(`persist:${keySession}`);
        return initialState;
      }
      return {
        token: action.payload.token,
        remember: action.payload.remember,
        name: decoded.name,
        email: decoded.email,
      };
    },
    logout: () => {
      sessionStorage.removeItem(`persist:${keySession}`);
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(isLogged.rejected, () => initialState);
  },
});

export const userReducer = slice.reducer;
export const userActions = slice.actions;
