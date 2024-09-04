import styled from "styled-components";
import capybara from "../capybara.png";
import Image from "next/image";

const StyledFood = styled.div`
  position: absolute;
  top: ${({ $topcoor }) => $topcoor};
  left: ${({ $leftcoor }) => $leftcoor};
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
      $topcoor={`${foodPosition.y}px`}
      $leftcoor={`${foodPosition.x}px`}
    >
      <StyledIconContainer>
        <StyledIcon alt={pet.type}>{pet.picture}</StyledIcon>
      </StyledIconContainer>
    </StyledFood>
  );
}
