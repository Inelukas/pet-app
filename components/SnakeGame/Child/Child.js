import Image from "next/image";
import styled from "styled-components";
import capybara from "../capybara.png";

const StyledChild = styled.div`
  position: absolute;
  top: ${({ $topcoor }) => $topcoor};
  left: ${({ $leftcoor }) => $leftcoor};
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
  rotate: ${(props) => (props.$gameOn ? "unset" : "calc(180deg)")};
`;

export default function Child({ childPosition, gameOn, pet }) {
  return (
    <StyledChild
      $topcoor={`${childPosition.y}px`}
      $leftcoor={`${childPosition.x}px`}
    >
      <StyledIconContainer>
        <StyledIcon alt={pet.type} $gameOn={gameOn}>
          {pet.picture}
        </StyledIcon>
      </StyledIconContainer>
    </StyledChild>
  );
}
