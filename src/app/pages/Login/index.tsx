import { Box } from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export function Login() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 h-screen min-h-full px-4 sm:px-6 lg:px-8">

      <Box className="flex flex-1 justify-center content-center items-center">

        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={1}
          flipSpeedFrontToBack={1}
        >
          <SignIn handleFlip={handleFlip} />

          <SignUp handleFlip={handleFlip} />
        </ReactCardFlip>
      </Box>

      <Box className="hidden lg:flex flex-1 justify-center content-center items-center">
        Dienerr
      </Box>
    </div>
  );
}
