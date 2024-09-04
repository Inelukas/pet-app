import styled from "styled-components";

const StyledFood = styled.div`
  position: absolute;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  z-index: 2;
`;

const StyledIconContainer = styled.div`
  display: grid;
  place-content: center;
  width: 30px;
  height: 30px;
`;

const StyledIcon = styled.span`
  font-size: 20px;
`;

export default function Food({ foodPosition, pet }) {
  return (
    <StyledFood
      $topPosition={`${foodPosition.y}px`}
      $leftPosition={`${foodPosition.x}px`}
    >
      <StyledIconContainer>
        <StyledIcon aria-label={pet.type}>{pet.picture}</StyledIcon>
      </StyledIconContainer>
    </StyledFood>
  );
}
