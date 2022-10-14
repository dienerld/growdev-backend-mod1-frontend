import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function ResponsiveTimePickers() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <TimePicker
        value={value}
        onChange={setValue}
        className="bg-white focus:shadow-none rounded-full"
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            InputProps={{
              ...params.InputProps,
              className: 'rounded-full h-10 min-w-full w-full sm:w-5/6',
              sx: {
                '& input:focus': { boxShadow: 0 },
                '& div button': { color: 'background.secondary' },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
