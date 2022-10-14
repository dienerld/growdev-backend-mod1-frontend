/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Fab, Modal,
  TextField,
  Typography, useTheme,
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { shade } from 'polished';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { CustomDatePicker } from './DatePicker';
import { CustomTimePicker } from './TimePicker';

export function NewTask() {
  const theme = useTheme();
  const [value, setValue] = useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z'),
  );

  const setShade = (): string => {
    const { mode, background } = theme.palette;
    const shadeColor = (v: number) => shade(v, background.paper);
    return mode === 'dark' ? shadeColor(-0.2) : shadeColor(0.2);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          autoComplete="off"
          sx={modalStyle}
          className="flex flex-col justify-center items-center rounded-[40px] w-10/12 sm:w-6/12 sm:min-w-[500px] lg:w-5/12 lg:max-w-[800px]  h-3/6"
          color="text.secondary"
        >
          <Typography id="modal-modal-title" variant="h4" component="h4">
            New Task
          </Typography>

          <Box className="flex flex-col flex-1 justify-center content-center items-center w-10/12 md:w-8/12 min-w-[180px] mt-4">
            <Box className="flex flex-col flex-1 items-center w-full">
              <Typography id="modal-modal-description">
                Title
              </Typography>
              <TextField
                className="w-full"
                InputProps={{
                  className: 'rounded-full bg-white h-10',
                  sx: { '& input:focus': { boxShadow: 0 } },
                }}
              />
            </Box>

            <Box className="flex flex-col flex-1 items-center">
              <Typography id="modal-modal-description">
                Date
              </Typography>
              <CustomDatePicker setValue={setValue} value={value} />
            </Box>

            <Box className="flex flex-col flex-1 items-center">
              <Typography id="modal-modal-description">
                Hour
              </Typography>
              <CustomTimePicker setValue={setValue} value={value} />
            </Box>

          </Box>
        </Box>
      </Modal>

      <Box className="absolute right-6 bottom-6">
        <Fab
          aria-label="like"
          variant="extended"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            '&:hover': { backgroundColor: setShade() },
          }}
          onClick={handleOpen}
        >
          <Typography sx={{ mr: 1 }}>New Task</Typography>
          <AddCircleOutlineIcon />
        </Fab>
      </Box>
    </>
  );
}
