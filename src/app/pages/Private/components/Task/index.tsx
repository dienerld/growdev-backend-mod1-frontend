import { Box, Checkbox, Typography } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarMonthIcon,
  EditOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon,
  QueryBuilderOutlined as ClockIcon,
} from '@mui/icons-material';

import { TTask } from '@/@types/app';

type TTaskProps = {
  task: TTask;
};

export function Task({ task }: TTaskProps) {
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
        />
        <Typography className="ml-1">
          {task.title}
        </Typography>
      </Box>

      <Typography className="hidden sm:flex col-span-3 items-center justify-center" variant="body2">
        <CalendarMonthIcon className="mr-2" />
        {task.date.toLocaleDateString()}
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
