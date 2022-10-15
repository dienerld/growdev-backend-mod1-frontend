/* eslint-disable no-unused-vars */
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Button, Checkbox, Fab, FormControlLabel, Modal, TextField, Typography, useTheme,
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

import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { taskActions } from '@/app/redux/modules/tasks';
import { axios } from '@/app/services/axios';
import { TTask } from '@/@types/app';
import { CustomDatePicker } from '../NewTask/DatePicker';
import { CustomTimePicker } from '../NewTask/TimePicker';

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

  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date(task.date)));
  const [hourStr, minuteStr] = task.hour.split(':');
  const [hour, setHour] = useState<Dayjs | null>(dayjs(new Date()).set('hour', Number(hourStr)).set('minute', Number(minuteStr)));
  const [title, setTitle] = useState(task.title);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenModal = () => setOpenModalEdit(true);
  const handleClose = () => { setTitle(task.title); setOpenModalEdit(false); };

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

  const handleUpdateTask = async () => {
    try {
      const { data } = await axios.put(`/tasks/${task.id}`, { title, date, hour: hour?.format('HH:mm') }, { headers });
      dispatch(taskActions.updateTask({ id: task.id, changes: data }));
      handleSetMessage('Task updated');
      handleOpenSnackbar();
      handleClose();
    } catch (error) { /* */ }
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };

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
              {task.hour}
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
                onClick={handleOpenModal}
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
                onClick={handleDeleteTask}
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

        <Box className="col-span-6 flex items-center">
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
          className="hidden sm:flex col-span-2 items-center justify-center"
          variant="body2"
        >
          <CalendarMonthIcon className="mr-2" />
          {dayjs(task.date).format('DD/MM/YYYY')}
        </Typography>

        <Typography className="hidden sm:flex col-span-2 items-center justify-center" variant="body2">
          <ClockIcon className="mx-2" />
          {task.hour}
        </Typography>

        <Typography className="hidden sm:flex col-span-2 items-center justify-end gap-3">
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
            onClick={handleOpenModal}
          />
          <DeleteIcon
            fontSize="small"
            className="cursor-pointer"
            sx={{ color: 'custom.icons.delete' }}
            onClick={handleDeleteTask}
          />
        </Typography>
      </Box>

      <Modal
        open={openModalEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={modalStyle}
          className="flex flex-col justify-center items-center rounded-[40px] w-10/12 sm:w-6/12 sm:min-w-[500px] lg:w-5/12 lg:max-w-[800px] "
          color="text.secondary"
        >
          <Box
            component="form"
            autoComplete="off"
            className="flex flex-col justify-center items-center w-full h-full"
          >
            <Typography id="modal-modal-title" variant="h4" component="h4">
              Edit Task
            </Typography>

            <Box className="flex flex-col flex-1 justify-center content-center items-center w-10/12 md:w-8/12 min-w-[180px] mt-4 gap-4">
              <Box className="flex flex-col flex-1 items-center w-full">
                <Typography variant="h5" component="h5">
                  Title
                </Typography>
                <TextField
                  value={title}
                  className="w-full"
                  onChange={(e) => setTitle(e.target.value)}
                  InputProps={{
                    className: 'rounded-full bg-white h-10 text-black',
                    sx: { '& input:focus': { boxShadow: 0 } },
                  }}
                />
              </Box>

              <Box className="flex flex-col flex-1 items-center">
                <Typography variant="h5" component="h5">
                  Date
                </Typography>
                <CustomDatePicker setValue={setDate} value={date} />
              </Box>

              <Box className="flex flex-col flex-1 items-center">
                <Typography variant="h5" component="h5">
                  Hour
                </Typography>
                <CustomTimePicker setValue={setHour} value={hour} />
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col flex-1 content-center items-end w-full mt-8 -mb-2 -mr-2">
            <Fab
              color="primary"
              variant="extended"
              aria-label="add"
              onClick={handleUpdateTask}
              sx={{
                height: 40,
                backgroundColor: 'background.default',
                color: 'text.primary',
                '&:hover': { backgroundColor: shade(-0.2, theme.palette.background.default) },
              }}
            >
              <Typography variant="body1" className="normal-case">Update</Typography>
            </Fab>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
