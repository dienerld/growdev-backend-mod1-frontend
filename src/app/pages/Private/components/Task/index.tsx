/* eslint-disable no-unused-vars */
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Button, Checkbox, FormControlLabel, Typography, useTheme,
} from '@mui/material';
import {
  CalendarMonthOutlined as CalendarMonthIcon,
  EditOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon,
  QueryBuilderOutlined as ClockIcon,
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { shade } from 'polished';

import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { taskActions } from '@/app/redux/modules/tasks';
import { axios } from '@/app/services/axios';
import { TTask } from '@/@types/app';

type TTaskProps = {
  task: TTask;
  handleOpenSnackbar: () => void;
  handleSetMessage: (message: string) => void;
};
export function Task({ task, handleOpenSnackbar, handleSetMessage }: TTaskProps) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const headers = { Authorization: `Bearer ${user.token}` };
  const handleToggleDone = () => {
    axios.put(`/tasks/${task.id}`, { done: !task.done }, { headers })
      .then(({ data }) => dispatch(taskActions.updateTask({ id: task.id, changes: data })))
      .catch(() => null);
  };

  const handleDeleteTask = () => {
    axios.delete(`/tasks/${task.id}`, { headers })
      .then(() => {
        handleSetMessage('Task deleted');
        handleOpenSnackbar();
        dispatch(taskActions.removeTask(task.id));
      })
      .catch(() => null);
  };

  const handleToggleVisibility = () => {
    axios.put(`/tasks/${task.id}`, { hidden: !task.hidden }, { headers })
      .then(({ data }) => {
        dispatch(taskActions.updateTask({ id: task.id, changes: data }));
        handleSetMessage('Task visibility changed');
        handleOpenSnackbar();
      })
      .catch(() => null);
  };

  const isDark = () => theme.palette.mode === 'dark';
  return (
    <>
      <Accordion
        className="grid sm:hidden rounded-3xl"
        sx={{ '&.MuiPaper-root::before': { height: '0px' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
          sx={{ border: 0 }}
          className="flex items-center"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            className="mr-0 -ml-2"
            control={(
              <Checkbox
                size="small"
                checked={task.done}
                onChange={handleToggleDone}
                color="secondary"
              />
            )}
            label=""
          />
          <Typography color="text.secondary" className="self-center">{task.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box color="text.secondary" className="flex flex-col gap-2 -mt-2">
            <Typography className="flex items-center" variant="body1">
              <CalendarMonthIcon className="mr-2" />
              {dayjs(task.date).format('DD/MM/YYYY')}
            </Typography>
            <Typography className="flex items-center" variant="body1">
              <ClockIcon className="mr-2" />
              {dayjs(task.date).format('HH:mm')}
            </Typography>

            <Button
              className="self-start -ml-2 -mt-1 text-inherit normal-case"
              sx={{ transform: 'none' }}
              onClick={handleToggleVisibility}
            >
              {task.hidden ? (
                <VisibilityOffIcon
                  className="mr-2"
                />
              ) : (
                <VisibilityIcon
                  className="mr-2"
                />
              )}
              <Typography variant="body1">
                {task.hidden ? 'Hidden' : 'Visible'}
              </Typography>
            </Button>

            <Box className="self-end flex gap-4" color={isDark() ? 'text.secondary' : 'text.primary'}>
              <Button
                className="flex items-center rounded-full text-inherit normal-case"
                variant="outlined"
                sx={{
                  backgroundColor: shade(0.05, theme.palette.background.default),
                  '&:hover': {
                    backgroundColor: isDark()
                      ? shade(-0.5, theme.palette.background.default)
                      : shade(0.2, theme.palette.background.default),
                  },
                }}
              >
                <EditIcon
                  className="mr-2 cursor-pointer"
                  sx={{
                    color: 'custom.icons.edit',
                  }}
                />
                Edit
              </Button>
              <Button
                className="flex items-center rounded-full text-inherit normal-case"
                variant="outlined"
                sx={{
                  backgroundColor: shade(0.05, theme.palette.background.default),
                  '&:hover': {
                    backgroundColor: isDark()
                      ? shade(-0.5, theme.palette.background.default)
                      : shade(0.2, theme.palette.background.default),
                  },
                }}
              >
                <DeleteIcon
                  className="mr-2 cursor-pointer"
                  onClick={handleDeleteTask}
                  sx={{
                    color: 'custom.icons.delete',
                  }}
                />
                Delete
              </Button>

            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box
        className="hidden sm:grid grid-cols-12 rounded-3xl p-4"
        sx={{ color: 'text.secondary', backgroundColor: 'background.paper' }}
      >

        <Box className="col-span-5 flex items-center">
          <Checkbox
            size="small"
            checked={task.done}
            onChange={handleToggleDone}
            color="secondary"
          />
          <Typography className="ml-1">
            {task.title}
          </Typography>
        </Box>

        <Typography
          className="hidden sm:flex col-span-3 items-center justify-center"
          variant="body2"
        >
          <CalendarMonthIcon className="mr-2" />
          {dayjs(task.date).format('DD/MM/YYYY')}
        </Typography>

        <Typography className="hidden sm:flex col-span-2 items-center justify-center" variant="body2">
          <ClockIcon className="mr-2" />
          {task.hour}
        </Typography>

        <Typography className="hidden sm:flex col-span-2 items-center justify-end gap-4">
          { !task.hidden ? (
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

    </>

  );
}
