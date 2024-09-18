import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const PlayerWrapper = styled.aside`
  display: flex;
`;

const NoteIcon = styled.div`
  position: fixed;
  width: 25px;
  height: 25px;
  right: 0px;
  top: 50%;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  @media screen and (min-width: 600px) {
    transform: scale(1.2);
  }

  @media (min-width: 650px) {
    right: 33%;
  }
`;

const PlayerContainer = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  position: fixed;
  background-color: var(--secondary-color);
  border: 2px solid black;
  border-radius: 10px;
  width: 50px;
  height: 375px;
  right: 0px;
  top: 42%;

  &:hover {
    opacity: 1;
  }

  @media screen and (min-width: 600px) {
    transform: scale(1.2);
    right: 33%;
    top: 45%;
  }
`;

const PlayPauseButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 5px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const ArrowIcon = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 5px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const VolumeControl = styled(motion.input)`
  -webkit-appearance: none;
  border-radius: 5px;
  outline: none;
  margin: 5px;
  width: 50px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: black;
    width: 8px;
    height: 8px;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;

    width: 12px;
    height: 12px;
    margin-top: -2px;
    border-radius: 50%;
    background: var(--signal-color);
    cursor: pointer;
  }

  &:active::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
`;

function MusicPlayer({
  isPlaying,
  volume,
  isExpanded,
  onTogglePlayPause,
  onVolumeChange,
  onTogglePlayer,
  onPlay,
}) {
  return (
    <>
      <PlayerWrapper>
        {!isExpanded && (
          <NoteIcon>
            <Image
              src="/assets/key.png"
              alt="Note Icon"
              onClick={onTogglePlayer}
              width={20}
              height={20}
            />
          </NoteIcon>
        )}
        {isExpanded && (
          <PlayerContainer
            initial={{ height: 0, opacity: 0 }}
            animate={
              isExpanded
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            <PlayPauseButton onClick={onTogglePlayPause}>
              {isPlaying ? (
                <Image
                  src="/assets/pause.png"
                  alt="Pause Icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/assets/play.png"
                  alt="Play Icon"
                  width={20}
                  height={20}
                  onClick={onPlay}
                />
              )}
            </PlayPauseButton>
            <VolumeControl
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(event) => onVolumeChange(parseInt(event.target.value))}
              initial={{ rotate: -90, opacity: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -90, opacity: 1 }}
            />
            <ArrowIcon>
              <Image
                src="/assets/doublearrow.png"
                alt="Collapse Icon"
                onClick={onTogglePlayer}
                width={20}
                height={20}
              />
            </ArrowIcon>
          </PlayerContainer>
        )}
      </PlayerWrapper>
    </>
  );
}

export default MusicPlayer;
