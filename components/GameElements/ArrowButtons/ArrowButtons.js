import styled from "styled-components";

const StyledArrowContainer = styled.div`
  position: relative;
  height: 100px;

  @media screen and (min-width: 1200px) {
    padding-top: 20px;
  }
`;

const StyledMoveButton = styled.button`
  position: absolute;
  width: 70px;
  height: 40px;
  background: var(--secondary-gradient);
  border-radius: 10px;
  font-size: 20px;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  box-shadow: var(--global-shadow);

  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--signal-gradient);
    box-shadow: var(--global-shadow);
    transform: scale(1.1);
  }
  &:active {
    background: var(--secondary-gradient);
  }
`;

export default function ArrowButtons({ onDirection, hide, gameOn }) {
  return (
    <StyledArrowContainer>
      {!hide && (
        <StyledMoveButton
          onClick={() => onDirection("ArrowUp")}
          $topPosition="-50px"
          $leftPosition="-35px"
          disabled={!gameOn}
        >
          ↑
        </StyledMoveButton>
      )}
      <StyledMoveButton
        $topPosition="0px"
        $leftPosition="40px"
        onClick={() => onDirection("ArrowRight")}
        disabled={!gameOn}
      >
        →
      </StyledMoveButton>
      <StyledMoveButton
        $topPosition="0px"
        $leftPosition="-110px"
        onClick={() => onDirection("ArrowLeft")}
        disabled={!gameOn}
      >
        ←
      </StyledMoveButton>
      {!hide && (
        <StyledMoveButton
          $topPosition="50px"
          $leftPosition="-35px"
          onClick={() => onDirection("ArrowDown")}
          disabled={!gameOn}
        >
          ↓
        </StyledMoveButton>
      )}
    </StyledArrowContainer>
  );
}
