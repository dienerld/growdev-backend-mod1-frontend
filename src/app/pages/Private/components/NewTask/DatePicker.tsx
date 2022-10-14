/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type DatePickerProps = {
  value: Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setValue: (date: Dayjs | null) => void;
}

export function CustomDatePicker({ setValue, value }:DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={setValue}
        className=" bg-white focus:shadow-none rounded-full"
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              className: 'rounded-full h-10',
              sx: { '& input:focus': { boxShadow: 0 } },
            }}
          />
        )}
      />
    </LocalizationProvider>

  );
}
