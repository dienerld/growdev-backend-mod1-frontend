import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Alert, Box, Snackbar } from '@mui/material';

import { useAppSelector } from '@redux/hooks';
import { selectorTasks } from '@redux/modules/tasks';

import { NoTask } from '../components/NoTask';
import { NewTask } from '../components/NewTask';
import { Task } from '../components/Task';

export function HomePrivate() {
  const [loading, setLoading] = useState(true);
  const tasks = useAppSelector(selectorTasks.selectAll);
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSetMessage = (message: string) => setSnackbarMessage(message);
  const handleOpenSnackbar = () => setStateSnackbar(true);
  const handleCloseSnackbar = () => setStateSnackbar(false);

  useEffect(() => {
    setLoading(false);
  }, [tasks]);

  return (
    <Box className="mt-10">
      {loading && <div>Loading</div>}
      {!loading && tasks.length === 0 && (<NoTask />)}
      {!loading && tasks.length > 0 && (
        <Box className="flex flex-col gap-2 mx-2 sm:mx-8">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleOpenSnackbar={handleOpenSnackbar}
              handleSetMessage={handleSetMessage}
            />
          ))}
        </Box>
      )}
      <Link to="/auth/profile">New Task</Link>
      {/* float button  */}
      <NewTask />

      <Snackbar
        open={stateSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ mt: 6 }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
