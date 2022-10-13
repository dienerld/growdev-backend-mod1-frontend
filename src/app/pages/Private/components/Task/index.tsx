import { Box, Checkbox, Typography } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarMonthIcon,
  EditOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon,
  QueryBuilderOutlined as ClockIcon,
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { taskActions } from '@/app/redux/modules/tasks';
import { axios } from '@/app/services/axios';
import { TTask } from '@/@types/app';

type TTaskProps = {
  task: TTask;
};
export function Task({ task }: TTaskProps) {
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const handleToggleDone = async () => {
    const { data } = await axios.put(`/tasks/${task.id}`, { done: !task.done }, { headers: { Authorization: `Bearer ${user.token}` } });

    dispatch(taskActions.updateTask({ id: task.id, changes: data }));
  };

  return (
    <Box
      className="grid grid-cols-12 rounded-3xl p-4"
      sx={{
        backgroundColor: 'background.primary',
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
          {task.date}
        </>
      </Typography>

      <Typography className="hidden sm:flex col-span-2 items-center justify-center" variant="body2">
        <ClockIcon className="mr-2" />
        {task.hour}
      </Typography>

      <Typography className="hidden sm:flex col-span-2 items-center justify-end gap-4">
        <EditIcon fontSize="small" color="warning" />
        <DeleteIcon fontSize="small" color="error" />
      </Typography>

    </Box>
  );
}
