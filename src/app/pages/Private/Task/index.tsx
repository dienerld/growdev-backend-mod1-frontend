/* eslint-disable no-console */

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks';
import { axios } from '@/app/services/axios';

type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  tasks: {id: number, title: string}[];
}

export function Task() {
  const { token } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser>({} as TUser);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>{user.name}</h1>
          <ul>
            {user.tasks.map((task) => <li key={task.id}>{task.title}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}
