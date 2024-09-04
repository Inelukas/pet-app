import styled from "styled-components";

const StyledChild = styled.div`
  position: absolute;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  font-size: 1rem;
  border: black;
`;

const StyledIconContainer = styled.div`
  display: grid;
  place-content: center;
  width: 30px;
  height: 30px;
`;

const StyledIcon = styled.span`
  font-size: 15px;
  transform: ${({ $gameOn }) => ($gameOn ? "rotate(0deg)" : "rotate(180deg)")};
`;

export default function PetChild({ childPosition, gameOn, pet }) {
  return (
    <StyledChild
      $topPosition={`${childPosition.y}px`}
      $leftPosition={`${childPosition.x}px`}
    >
      <StyledIconContainer>
        <StyledIcon aria-label={pet.type} $gameOn={gameOn}>
          {pet.picture}
        </StyledIcon>
      </StyledIconContainer>
    </StyledChild>
  );
}
