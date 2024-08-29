import styled from "styled-components";

const StyledIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  h3 {
    width: 30%;
  }
`;

const StyledBarContainer = styled.div`
  width: 60%;
  height: 25px;
  border-radius: 10px;
  border: 2px solid black;
  text-align: right;
  padding: 1px 5px;
  background-color: #ffffff;
  position: relative;
`;

const StyledBar = styled.div`
  height: 21px;
  border-radius: 8px;
  position: absolute;
  left: 0px;
  top: 0px;
`;

export default function Indicator({ data }) {
  return (
    <StyledIndicator>
      <h3>{data.name}:</h3>
      <StyledBarContainer>
        <StyledBar
          style={{
            background: `${
              data.name === "Health"
                ? "green"
                : data.name === "Happiness"
                ? "pink"
                : data.name === "Hunger"
                ? "orange"
                : data.name === "Energy"
                ? "yellow"
                : data.name === "Intelligence"
                ? "lightblue"
                : "gray"
            }`,
            width: `${data.count}%`,
          }}
        >
          {data.count}/100&nbsp;
        </StyledBar>
      </StyledBarContainer>
    </StyledIndicator>
  );
}
