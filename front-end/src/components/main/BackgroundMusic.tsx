import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import box from '../../assets/box/backgroundmusic.png'
import { url } from 'inspector';
import {SoundOn, SoundOff} from './BackgroundMusicStyles'

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();



  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setCurrentVolume(newVolume);
    }
  };

  if (location.pathname === '/session' || location.pathname === '/friendsession') {
    pauseMusic();
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: 5, left: 3, zIndex: 999,display: 'flex',alignItems: 'center', backgroundImage:`url(${box})`, borderRadius: '5px' }}>  
      {isPlaying ? <SoundOn onClick={toggleMusic}/> : <SoundOff onClick={toggleMusic}/>}
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        defaultValue={currentVolume.toString()} 
        onChange={handleVolumeChange}
      />
      <audio ref={audioRef}  loop={true}>
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default BackgroundMusic;
