import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { isLogged } from '@redux/modules/user';
import { Navbar } from './components/Navbar';

export function Public() {
  const user = useAppSelector((state) => state.user);
  const redirect = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.remember) { redirect('/auth'); }

    (async () => {
      const { payload: logged } = await dispatch(isLogged());
      if (logged) { redirect('/auth'); }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
