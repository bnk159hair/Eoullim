import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SpinnerContainer, AnimalEmoji, Spinner } from './LoadingStyles';

const Loading = () => {
  const [animal, setAnimal] = useState('🐱');
  useEffect(() => {
    const animalArray = [
      '🐱',
      '🐶',
      '🐰',
      '🦊',
      '🐷',
      '🐹',
      '🦁',
      '🐸',
      '🐯',
      '🦄',
      '🐻',
      '🐵',
    ];
    const randomAnimal = setInterval(() => {
      const animalIndex = Math.floor(Math.random() * animalArray.length);

      const newAnimal = animalArray[animalIndex];

      setAnimal(newAnimal);
    }, 1400);

    return () => {
      clearInterval(randomAnimal);
    };
  }, []);

  return (
    <SpinnerContainer>
      <Spinner>
        <CircularProgress size={200} />
        <AnimalEmoji>{animal}</AnimalEmoji>
      </Spinner>
    </SpinnerContainer>
  );
};

export default Loading;
