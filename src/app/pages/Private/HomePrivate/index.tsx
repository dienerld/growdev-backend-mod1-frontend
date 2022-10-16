import { useState, useEffect } from 'react';

import {
  Alert, Box, Pagination, Snackbar,
} from '@mui/material';

import { useAppSelector } from '@redux/hooks';
import { selectorTasks } from '@redux/modules/tasks';

import { NoTask } from '../components/NoTask';
import { NewTask } from '../components/NewTask';
import { Task } from '../components/Task';

export function HomePrivate() {
  const [loading, setLoading] = useState(true);
  const tasks = useAppSelector(selectorTasks.selectAll);
  const totalTasks = useAppSelector(selectorTasks.selectTotal);
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [maxTaskPerPage] = useState(window.innerHeight > 700 ? 10 : 6);
  const [pages, setPages] = useState(Math.ceil(totalTasks / 10));
  const [page, setPage] = useState(1);
  const [taskPage, setTaskPage] = useState(tasks.slice(0, maxTaskPerPage));

  const handleChangePagination = (_: any, value: number) => {
    setPage(value);
    setTaskPage(tasks.slice((value - 1) * maxTaskPerPage, value * maxTaskPerPage));
  };
  const handleSetMessage = (message: string) => setSnackbarMessage(message);
  const handleOpenSnackbar = () => setStateSnackbar(true);
  const handleCloseSnackbar = () => setStateSnackbar(false);

  useEffect(() => {
    setLoading(false);
  }, [tasks]);

  useEffect(() => {
    setPages(Math.ceil(totalTasks / maxTaskPerPage));
  }, [totalTasks]);

  useEffect(() => {
    setTaskPage(tasks.slice((page - 1) * maxTaskPerPage, page * maxTaskPerPage));
  }, [page, tasks]);

  useEffect(() => {
    setTaskPage(tasks.slice(0, maxTaskPerPage));
    setPages(Math.ceil(totalTasks / maxTaskPerPage));
  }, []);

  return (
    <Box className="flex flex-col flex-1 mt-10">
      {loading && <div>Loading</div>}
      {!loading && tasks.length === 0 && (<NoTask />)}
      {!loading && taskPage.length > 0 && (
        <>
          <Box className="flex flex-col gap-2 mx-2 sm:mx-8">
            {taskPage.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleOpenSnackbar={handleOpenSnackbar}
                handleSetMessage={handleSetMessage}
              />
            ))}
          </Box>
          <Box className="self-center my-4">
            <Pagination count={pages} page={page} onChange={handleChangePagination} />
          </Box>
        </>
      )}

      {/* float button  */}
      <NewTask />

      {/* snackbar feedback action */}
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
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
