import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SpinnerContainer, AnimalEmoji } from './LoadingStyles';

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
      <AnimalEmoji>{animal}</AnimalEmoji>
      <CircularProgress size={100} />
    </SpinnerContainer>
  );
};

export default Loading;
