import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledPlayer = styled.div`
  position: absolute;
  top: ${({ $topcoor }) => $topcoor};
  left: ${({ $leftcoor }) => $leftcoor};
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
  rotate: ${(props) => (props.$gameOn ? "unset" : "calc(180deg)")};
`;

export default function Player({ onDirection, playerPosition, gameOn, pet }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.focus();
    }
  }, [playerPosition]);

  useEffect(() => {
    function handleBlur() {
      if (playerRef.current) {
        playerRef.current.focus();
      }
    }

    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <StyledPlayer
      ref={playerRef}
      tabIndex={0}
      onKeyDown={onDirection}
      $topcoor={`${playerPosition.y}px`}
      $leftcoor={`${playerPosition.x}px`}
    >
      <StyledIconContainer>
        <StyledIcon alt={pet.type} $gameOn={gameOn}>
          {pet.picture}
        </StyledIcon>
      </StyledIconContainer>
    </StyledPlayer>
  );
}
