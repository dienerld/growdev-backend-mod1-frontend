import { useEffect } from 'react';
import {
  Outlet, useNavigate,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { isLogged, userActions } from '@redux/modules/user';

export function Private() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user.remember) {
          dispatch(userActions.login(user));
        } else {
          const { payload } = (await dispatch(isLogged()));
          const logged = payload;

          if (!logged) {
            redirect('/');
          }
        }
      } catch (err) {
        redirect('/');
      }
    })();
  }, []);

  return (
    <Outlet />
  );
}
