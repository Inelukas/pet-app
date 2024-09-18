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
  box-shadow: var(--global-shadow);

  @media screen and (min-width: 600px) {
    width: 60%;
  }
`;

const colorMap = {
  health: "var(--health-gradient)",
  happiness: "var(--happiness-gradient)",
  hunger: "var(-hunger-gradient)",
  energy: "var(-energy-gradient)",
  intelligence: "var(--intelligence-gradient)",
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
