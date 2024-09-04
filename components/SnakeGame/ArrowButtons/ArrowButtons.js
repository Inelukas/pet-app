import styled from "styled-components";

const StyledArrowButtons = styled.div`
  position: absolute;
  bottom: 25vh;

  @media screen and (min-width: 900px) {
    bottom: 20vh;
  }
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
          style={{ top: "-40px", left: "-25px" }}
        >
          ↑
        </StyledMoveButton>
        <StyledMoveButton
          onClick={() => onDirection("ArrowRight")}
          style={{ top: "0px", left: "30px" }}
        >
          →
        </StyledMoveButton>
        <StyledMoveButton
          onClick={() => onDirection("ArrowLeft")}
          style={{ top: "0px", left: "-80px" }}
        >
          ←
        </StyledMoveButton>
        <StyledMoveButton
          onClick={() => onDirection("ArrowDown")}
          style={{ bottom: "-70px", left: "-25px" }}
        >
          ↓
        </StyledMoveButton>
      </StyledMoveButtonBox>
    </StyledArrowButtons>
  );
}
