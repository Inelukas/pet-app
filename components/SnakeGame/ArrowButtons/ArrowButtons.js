import styled from "styled-components";

const StyledArrowButtons = styled.div`
  position: absolute;
  bottom: 25vh;
`;

const StyledMoveButtonBox = styled.div`
  position: relative;
`;

const StyledMoveButton = styled.button`
  position: absolute;
  width: 50px;
  height: 30px;
  background: lightgreen;
  border-radius: 20px;
  font-size: 20px;
`;

export default function ArrowButtons({ onDirection }) {
  return (
    <StyledArrowButtons>
      <StyledMoveButtonBox>
        <StyledMoveButton
          onClick={() => onDirection("ArrowUp")}
          style={{ top: "-30px", left: "-25px" }}
        >
          ↑
        </StyledMoveButton>
        <StyledMoveButton
          onClick={() => onDirection("ArrowRight")}
          style={{ top: "0px", left: "10px" }}
        >
          →
        </StyledMoveButton>
        <StyledMoveButton
          onClick={() => onDirection("ArrowLeft")}
          style={{ top: "0px", left: "-60px" }}
        >
          ←
        </StyledMoveButton>
        <StyledMoveButton
          onClick={() => onDirection("ArrowDown")}
          style={{ bottom: "-60px", left: "-25px" }}
        >
          ↓
        </StyledMoveButton>
      </StyledMoveButtonBox>
    </StyledArrowButtons>
  );
}
