import styled from "styled-components";

const StyledIndicator = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  font-size: 0.8rem;

  @media screen and (min-width: 600px) {
    gap: 30px;
    font-size: 1rem;
  }
  h3 {
    width: 25%;
    @media screen and (min-width: 600px) {
      width: 30%;
    }
  }
`;

const StyledBarContainer = styled.div`
  width: 55%;
  height: 25px;
  border-radius: 10px;
  border: 2px solid #000000;
  text-align: right;
  padding: 1px 5px;
  background-color: #ffffff;
  position: relative;

  @media screen and (min-width: 600px) {
    width: 60%;
  }
`;

const colorMap = {
  health: "linear-gradient(90deg, #76c893, #90ee90, #c7e9b0)",
  happiness: "linear-gradient(90deg, #ff69b4, #ffc0cb, #ffb6c1)",
  hunger: "linear-gradient(90deg, #ff8c00, #ffa500, #ffd700)",
  energy: "linear-gradient(90deg, #ffff99, #ffff00, #ffd700)",
  intelligence: "linear-gradient(90deg, #87cefa, #add8e6, #b0e0e6)",
};

const StyledBar = styled.div`
  height: 21px;
  border-radius: 8px;
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ width }) => width};
  background: ${({ name }) => colorMap[name] || "#808080"};
`;

export default function Indicator({ data, showBarName = true }) {
  return (
    <StyledIndicator>
      {showBarName ? <h3>{data.name}:</h3> : null}
      <StyledBarContainer>
        <StyledBar width={`${data.count}%`} name={data.name}>
          {data.count}/100&nbsp;
        </StyledBar>
      </StyledBarContainer>
    </StyledIndicator>
  );
}
