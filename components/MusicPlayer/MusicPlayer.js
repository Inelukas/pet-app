import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const PlayerWrapper = styled.aside`
  display: flex;
`;

const NoteIcon = styled.div`
  position: fixed;
  width: 30px;
  height: 30px;
  right: 0px;
  top: 50%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    scale: 1.1;
  }

  @media screen and (min-width: 600px) {
    top: 50%;
    right: 0px;
    bottom: auto;
  }
`;

const PlayerContainer = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  background-color: var(--secondary-color);
  border: 2px solid black;
  width: 50px;
  height: 375px;
  right: 0px;
  top: 50%;
  transition: opacity 0.2s;
  opacity: 0.6;
  z-index: 5;

  &:hover {
    opacity: 1;
  }

  @media screen and (min-width: 600px) {
    flex-direction: column;
    width: auto;
    height: auto;
    top: 50%;
    right: 0px;
    bottom: auto;
    transform: translateY(-50%);
  }
`;

const PlayPauseButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  margin: 5px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const ArrowIcon = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: rotate(90deg);
  right: 0px;
  top: 50%;
  opacity: 0.6;
  margin-left: auto;
  &:hover {
    opacity: 1;
  }
`;

const VolumeControl = styled(motion.input)`
  border-radius: 5px;
  outline: none;
  margin: 5px;
  opacity: 0.6;
  cursor: pointer;
  transform: rotate(-90deg);

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: black;
    height: 8px;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red;
    cursor: pointer;
    margin-top: -4px;
  }

  &:active::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #1a3636;
  }
`;

const MusicPlayer = ({ soundtrack }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    setVolume(value);
  };

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <PlayerWrapper>
      {!isExpanded && (
        <NoteIcon>
          <Image
            src="/assets/key.png"
            alt="Note Icon"
            onClick={togglePlayer}
            width={30}
            height={30}
          />
        </NoteIcon>
      )}

      <PlayerContainer
        initial={{ height: 0, opacity: 0 }}
        animate={
          isExpanded
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        <audio ref={audioRef} src={soundtrack} preload="auto" autoPlay loop />
        <PlayPauseButton onClick={togglePlayPause}>
          {isPlaying ? (
            <Image
              src="/assets/pause.png"
              alt="Pause Icon"
              width={30}
              height={30}
            />
          ) : (
            <Image
              src="/assets/play.png"
              alt="Play Icon"
              width={30}
              height={30}
              onClick={handlePlay}
            />
          )}
        </PlayPauseButton>
        <VolumeControl
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(event) => handleVolumeChange(parseInt(event.target.value))}
          whileHover={{ scale: 1.05 }}
        />
        <ArrowIcon>
          <Image
            src="/assets/doublearrow.png"
            alt="Collapse Icon"
            onClick={togglePlayer}
            width={40}
            height={40}
          />
        </ArrowIcon>
      </PlayerContainer>
    </PlayerWrapper>
  );
};

export default MusicPlayer;
