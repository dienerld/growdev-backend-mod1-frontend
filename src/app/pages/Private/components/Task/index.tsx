import {
  Box, Checkbox,
  Typography,
  useTheme,
} from '@mui/material';
import {
  CalendarMonthOutlined as CalendarMonthIcon,
  EditOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon,
  QueryBuilderOutlined as ClockIcon,
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
} from '@mui/icons-material';

import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { taskActions } from '@/app/redux/modules/tasks';
import { axios } from '@/app/services/axios';
import { TTask } from '@/@types/app';

type TTaskProps = {
  task: TTask;
  handleToggleSnackbar: () => void;
};
export function Task({ task, handleToggleSnackbar }: TTaskProps) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleToggleDone = () => {
    axios.put(`/tasks/${task.id}`, { done: !task.done }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => dispatch(taskActions.updateTask(
        { id: task.id, changes: data },
      )))
      .catch(() => null);
  };

  const handleDeleteTask = () => {
    axios.delete(`/tasks/${task.id}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => {
        handleToggleSnackbar();
        dispatch(taskActions.removeTask(task.id));
      })
      .catch(() => null);
  };

  const handleToggleVisibility = () => {
    axios.put(`/tasks/${task.id}`, { hidden: !task.hidden }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => dispatch(taskActions.updateTask(
        { id: task.id, changes: data },
      )))
      .catch(() => null);
  };

  useEffect(() => {
    console.log(window.screen.width);
  });
  return (
    <>
      <div />
      {/* TODO mudar para accordion */}
      {window.screen.width >= 600 && (
      <Box
        className="grid grid-cols-12 rounded-3xl p-4"
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
        }}
      >

        <Box className="col-span-5 flex items-center">
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            size="small"
            checked={task.done}
            onChange={handleToggleDone}
          />
          <Typography className="ml-1">
            {task.title}
          </Typography>
        </Box>

        <Typography className="hidden sm:flex col-span-3 items-center justify-center" variant="body2">
          <>
            <CalendarMonthIcon className="mr-2" />
            {dayjs(task.date).format('DD/MM/YYYY')}
          </>
        </Typography>

        <Typography className="hidden sm:flex col-span-2 items-center justify-center" variant="body2">
          <ClockIcon className="mr-2" />
          {task.hour}
        </Typography>

        <Typography className="hidden sm:flex col-span-2 items-center justify-end gap-4">
          { task.hidden ? (
            <VisibilityIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={handleToggleVisibility}
            />
          ) : (
            <VisibilityOffIcon
              fontSize="small"
              className="cursor-pointer"
              onClick={handleToggleVisibility}
            />
          )}
          <EditIcon
            fontSize="small"
            className="cursor-pointer"
            sx={{ color: 'custom.icons.edit' }}
          />
          <DeleteIcon
            fontSize="small"
            className="cursor-pointer"
            sx={{ color: 'custom.icons.delete' }}
            onClick={handleDeleteTask}
          />
        </Typography>

      </Box>

      )}
    </>

  );
}
