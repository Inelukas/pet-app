import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledPlayer = styled.div`
  position: absolute;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  font-size: 1.5rem;
  outline: none;
`;

const StyledIconContainer = styled.div`
  display: grid;
  place-content: center;
  width: 30px;
  height: 30px;
`;

const StyledIcon = styled.span`
  font-size: 25px;
  transform: ${({ $gameOn }) => ($gameOn ? "rotate(0deg)" : "rotate(180deg)")};
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
    >
      <StyledIconContainer>
        <StyledIcon aria-label={pet.type} $gameOn={gameOn}>
          {pet.picture}
        </StyledIcon>
      </StyledIconContainer>
    </StyledPlayer>
  );
}
