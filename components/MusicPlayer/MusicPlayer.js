import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const PlayerWrapper = styled.div`
  display: flex;
`;

const NoteIcon = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  right: 0px;
  bottom: 0px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    scale: 1.1;
  }

  @media screen and (min-width: 600px) {
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
  }
`;

const PlayerContainer = styled(motion.div)`
  position: fixed;
  background-color: grey;
  border-radius: 10px;
  width: 50px;
  height: 700px;
  right: 0px;
  top: 500px;
  margin: 20px;
  overflow: hidden;
  transition: opacity 0.2s;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  @media screen and (min-width: 600px) {
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
  }
`;

const Controls = styled.div`
  display: flex;
  width: 100px;
  height: 50px;
  cursor: pointer;
`;

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const ArrowIcon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transform: rotate(90deg);
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const VolumeControl = styled(motion.input)`
  border-radius: 5px;
  background: #697565;
  outline: none;
  margin: 5px;
  opacity: 0.6;
  transition: opacity 0.2s;
  cursor: pointer;
  transform: rotate(45deg);

  &:hover {
    opacity: 1;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff9900;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff9900;
    cursor: pointer;
  }
`;

const MusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

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
        <audio ref={audioRef} src="/assets/music/test.mp3" />

        <Controls>
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
              />
            )}
          </PlayPauseButton>
          <VolumeControl
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            whileHover={{ scale: 1.1 }}
          />
        </Controls>
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
