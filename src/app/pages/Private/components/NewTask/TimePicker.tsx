/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type TimePickerProps = {
  value: Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setValue: (date: Dayjs | null) => void;
}

export function CustomTimePicker({ setValue, value }:TimePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        value={value}
        onChange={setValue}
        className="bg-white focus:shadow-none rounded-full"
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
