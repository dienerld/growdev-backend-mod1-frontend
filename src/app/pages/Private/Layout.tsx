import { useEffect } from 'react';
import {
  Outlet, useNavigate,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { isLogged, userActions } from '@redux/modules/user';
import { Navbar } from './components/Navbar';
import { axios } from '@/app/services/axios';
import { taskActions } from '@/app/redux/modules/tasks';
import { ResponseUser } from '@/@types/app';

export function Private() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user.remember) {
          dispatch(userActions.login(user));

          //
        } else {
          const { payload: logged } = (await dispatch(isLogged()));
          if (!logged) { redirect('/'); }
        }

        const { data } = await axios.get<ResponseUser>(
          '/users',
          { headers: { Authorization: `Bearer ${user.token}` } },
        );
        dispatch(taskActions.addManyTasks(data.tasks));
      } catch (err) {
        redirect('/');
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
