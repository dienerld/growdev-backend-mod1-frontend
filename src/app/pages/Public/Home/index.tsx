import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

export function Home() {
  return (
    <div>
      <Button variant="contained">
        <Link to="/account">Login/Register</Link>
      </Button>
    </div>
  );
}
