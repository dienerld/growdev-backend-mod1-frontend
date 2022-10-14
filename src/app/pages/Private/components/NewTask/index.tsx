import {
  Box, Fab, Modal,
  TextField,
  Typography, useTheme,
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { shade } from 'polished';
import { useState } from 'react';
import BasicTimePicker from './TimePicker';

export function NewTask() {
  const theme = useTheme();

  const setShade = (): string => {
    const { mode, background } = theme.palette;
    const shadeColor = (value: number) => shade(value, background.primary);
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
    width: 400,
    bgcolor: 'background.primary',
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
          sx={modalStyle}
          className="flex flex-col justify-center items-center rounded-[40px] w-9/12 h-3/6"
          color="text.secondary"
        >
          <Typography id="modal-modal-title" variant="h4" component="h4">
            New Task
          </Typography>

          <Box className="flex flex-col flex-1 justify-center content-center items-center w-5/12 mt-4">
            <Box className="flex flex-col flex-1 items-center">
              <Typography id="modal-modal-description">
                Title
              </Typography>
              <TextField
                className="rounded-full bg-white text-black shadow-none"
                InputProps={{
                  className: 'rounded-full h-10 min-w-full w-full sm:w-5/6 text-black p-0',
                  sx: { '& input:focus': { boxShadow: 0 } },
                }}
              />
            </Box>

            <Box className="flex flex-col flex-1 items-center">
              <Typography id="modal-modal-description">
                Date
              </Typography>

            </Box>

            <Box className="flex flex-col flex-1 items-center">
              <Typography id="modal-modal-description">
                Title
              </Typography>
              <BasicTimePicker />
            </Box>

          </Box>
        </Box>
      </Modal>

      <Box className="absolute right-6 bottom-6">
        <Fab
          aria-label="like"
          variant="extended"
          sx={{
            backgroundColor: theme.palette.background.primary,
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
