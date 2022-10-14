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
  const handleToggleSnackbar = () => setStateSnackbar(!stateSnackbar);

  useEffect(() => {
    setLoading(false);
  }, [tasks]);

  return (
    <Box className="mt-10">
      {loading && <div>Loading</div>}
      {!loading && tasks.length === 0 && (<NoTask />)}
      {!loading && tasks.length > 0 && (
        <Box className="flex flex-col gap-4 mx-2 sm:mx-8">
          {tasks.map((task) => !task.hidden && (
          <Task
            key={task.id}
            task={task}
            handleToggleSnackbar={handleToggleSnackbar}
          />
          ))}
        </Box>
      )}
      <Link to="/auth/profile">New Task</Link>
      {/* float button  */}
      <NewTask />

      <Snackbar
        open={stateSnackbar}
        autoHideDuration={6000}
        onClose={handleToggleSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ mt: 6 }}
      >
        <Alert onClose={handleToggleSnackbar} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
}
