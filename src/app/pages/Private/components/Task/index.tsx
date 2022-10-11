import { Box, Typography } from '@mui/material';

type TTaskProps = {
  title: string;
};

export function Task({ title }: TTaskProps) {
  return (
    <Box
      className="grid grid-cols-12 rounded-3xl"
      sx={{
        backgroundColor: 'background.primary',
      }}
    >
      <Typography
        className="col-span-6"
        variant="h6"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          mb: 2,
        }}
      >{title}
      </Typography>

      <Typography className="col-span-2">
        Date
      </Typography>

      <Typography className="col-span-2">
        Hour
      </Typography>

      <Typography className="col-span-2">
        buttons
      </Typography>

    </Box>
  );
}
