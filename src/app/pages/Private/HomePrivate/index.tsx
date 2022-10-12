/* eslint-disable no-console */

import { useState, useEffect } from 'react';

import {
  Box, Fab, Typography, useTheme,
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { shade } from 'polished';

import { useAppSelector } from '@/app/redux/hooks';
import { Task } from '../components/Task';
import { selectorTasks } from '@/app/redux/modules/tasks';
import { NoTask } from '../components/NoTask';

function FloatButton() {
  const theme = useTheme();

  const setShade = (): string => {
    const { mode } = theme.palette;

    if (mode === 'dark') {
      return shade(-0.3, theme.palette.background.primary);
    }
    return shade(0.3, theme.palette.background.primary);
  };
  return (
    <Box className="absolute right-6 bottom-6">
      <Fab
        aria-label="like"
        variant="extended"
        sx={{
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.secondary,

          '&:hover': {
            backgroundColor: setShade(),
          },
        }}
      >
        <Typography sx={{ mr: 1 }}>New Task</Typography>
        <AddCircleOutlineIcon />
      </Fab>
    </Box>
  );
}

export function HomePrivate() {
  const [loading, setLoading] = useState(true);
  const tasks = useAppSelector(selectorTasks.selectAll);

  useEffect(() => {
    setLoading(false);
  }, [tasks]);

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && tasks.length === 0 && (<NoTask />)}
      {!loading && tasks.length > 0 && (
      <Box>
        {tasks.map((task) => <Task key={task.id} title={task.title} />)}
      </Box>
      )}
      {/* float button  */}
      <FloatButton />
    </>
  );
}
