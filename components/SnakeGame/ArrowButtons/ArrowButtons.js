import styled from "styled-components";

const StyledArrowContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`;

const StyledMoveButton = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  background: #90ee90;
  border-radius: 20px;
  font-size: 20px;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
`;

export default function ArrowButtons({ onDirection }) {
  return (
    <StyledArrowContainer>
      <StyledMoveButton
        onClick={() => onDirection("ArrowUp")}
        $topPosition="-40px"
        $leftPosition="-25px"
      >
        ↑
      </StyledMoveButton>
      <StyledMoveButton
        $topPosition="0px"
        $leftPosition="30px"
        onClick={() => onDirection("ArrowRight")}
      >
        →
      </StyledMoveButton>
      <StyledMoveButton
        $topPosition="0px"
        $leftPosition="-80px"
        onClick={() => onDirection("ArrowLeft")}
      >
        ←
      </StyledMoveButton>
      <StyledMoveButton
        $topPosition="40px"
        $leftPosition="-25px"
        onClick={() => onDirection("ArrowDown")}
      >
        ↓
      </StyledMoveButton>
    </StyledArrowContainer>
  );
}
