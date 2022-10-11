/* eslint-disable no-console */

import { useState, useEffect } from 'react';

import {
  Box, Fab, Typography, useTheme,
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';

import { useAppSelector } from '@/app/redux/hooks';
import { axios } from '@/app/services/axios';

type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  tasks: {id: number, title: string}[];
}

export function HomePrivate() {
  const theme = useTheme();
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
    <Box>
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

      {/* float button  */}
      <Box className="absolute right-6 bottom-6">
        <Fab
          aria-label="like"
          variant="extended"
          sx={{
            backgroundColor: theme.palette.background.btn,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography sx={{ mr: 1 }}>New Task</Typography>
          <AddCircleOutlineIcon />
        </Fab>
      </Box>
    </Box>
  );
}
