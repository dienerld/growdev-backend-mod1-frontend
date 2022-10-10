import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isLogged } from '../../store/modules/user';

export function Public() {
  const user = useAppSelector((state) => state.user);
  const redirect = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.remember) {
      redirect('/dashboard');
    }

    (async () => {
      const { payload: logged } = await dispatch(isLogged());
      if (logged) {
        redirect('/dashboard');
      }
    })();
  }, []);

  return (
    <Outlet />
  );
}
