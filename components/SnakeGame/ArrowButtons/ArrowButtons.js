import styled from "styled-components";

const StyledArrowContainer = styled.div`
  position: absolute;
  bottom: 25vh;

  @media screen and (min-width: 900px) {
    bottom: 20vh;
  }
`;

const StyledMoveButton = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  background: lightgreen;
  border-radius: 20px;
  font-size: 20px;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

export default function ArrowButtons({ onDirection }) {
  return (
    <StyledArrowContainer>
      <StyledMoveButton
        onClick={() => onDirection("ArrowUp")}
        top="-40px"
        left="-25px"
      >
        ↑
      </StyledMoveButton>
      <StyledMoveButton
        top="0px"
        left="30px"
        onClick={() => onDirection("ArrowRight")}
      >
        →
      </StyledMoveButton>
      <StyledMoveButton
        top="0px"
        left="-80px"
        onClick={() => onDirection("ArrowLeft")}
      >
        ←
      </StyledMoveButton>
      <StyledMoveButton
        top="40px"
        left="-25px"
        onClick={() => onDirection("ArrowDown")}
      >
        ↓
      </StyledMoveButton>
    </StyledArrowContainer>
  );
}
