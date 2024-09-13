import { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledPlayer = styled.div`
  display: grid;
  place-content: center;
  position: absolute;
  width: 30px;
  height: 30px;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  transform: ${({ $gameOn }) => ($gameOn ? "rotate(0deg)" : "rotate(180deg)")};
  outline: none;
`;

export default function Player({ onDirection, playerPosition, gameOn, pet }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.focus();
    }
  }, [playerPosition]);

  return (
    <StyledPlayer
      ref={playerRef}
      tabIndex={0}
      onKeyDown={onDirection}
      onBlur={() => playerRef.current.focus()}
      $topPosition={`${playerPosition.y}px`}
      $leftPosition={`${playerPosition.x}px`}
      $gameOn={gameOn}
    >
      <Image
        src={pet.picture}
        alt={pet.name}
        width={30}
        height={30}
        objectFit="cover"
        quality={100}
      />
    </StyledPlayer>
  );
}
