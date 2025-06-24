import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

import song1 from './aud1.mp3';
import song2 from './aud2.mp3';
import song3 from './aud3.mp3';
import image2 from './image.jpeg';

// Playlist array
const playlist = [
  {
    title: 'Blue',
    audio: song1,
    image: 'https://cdn-images.dzcdn.net/images/cover/b2caf907d15e54221b3a302e93903148/1900x1900-000000-80-0-0.jpg'
  },
  {
    title: 'Jo Tum Mere Ho',
    audio: song2,
    image: image2
  },
  {
    title: 'Die with a smile',
    audio: song3,
    image: 'https://miro.medium.com/v2/resize:fit:1170/1*cAmobBZDLzKWdywnOgtMng@2x.jpeg'
  }
];

const App = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTrack = playlist[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }
  };

  const handlePreviousSong = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleNextSong = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % playlist.length
    );
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="player">
      <img src={currentTrack.image} alt="Cover" className="cover" />
      <div className="title text-red-600">{currentTrack.title}</div>
      <input
        type="range"
        className="progress"
        min={0}
        max={playerRef.current ? playerRef.current.getDuration() : 0}
        value={currentTime}
        onChange={(e) =>
          playerRef.current && playerRef.current.seekTo(parseFloat(e.target.value))
        }
      />
      <div className="controls">
        <button onClick={handlePreviousSong}>⏮</button>
        <button onClick={handleRewind}>◄</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? '❚❚' : '►'}
        </button>
        <button onClick={handleForward}>►</button>
        <button onClick={handleNextSong}>⏭</button>
      </div>
      <ReactPlayer
        key={currentTrack.audio}
        ref={playerRef}
        url={currentTrack.audio}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onEnded={handleNextSong}
      />
    </div>
  );
};

export default App;
