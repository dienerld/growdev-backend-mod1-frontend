import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { isLogged, userActions } from '@redux/modules/user';
import { selectorTasks, taskActions } from '@/app/redux/modules/tasks';

import { axios } from '@/app/services/axios';
import { ResponseUser } from '@/@types/app';

import { Navbar } from './components/Navbar';

export function Private() {
  const { user } = useAppSelector((state) => state);
  const totalTasks = useAppSelector(selectorTasks.selectTotal);
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    if (user.remember) {
      dispatch(userActions.login(user));
    } else {
      dispatch(isLogged())
        .then((res) => !res.payload && redirect('/'))
        .catch(() => redirect('/'));
    }

    if (totalTasks === 0) {
      const headers = { Authorization: `Bearer ${user.token}` };
      axios.get<ResponseUser>('/users', { headers })
        .then(({ data }) => dispatch(taskActions.addManyTasks(data.tasks)))
        .catch(() => redirect('/'));
    }
  }, []);

  return (
    <>
      <Navbar settings={[]} />
      <Outlet />
    </>
  );
}
