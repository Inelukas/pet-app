import styled from "styled-components";

const StyledIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  h3 {
    width: 30%;
  }

  .bar {
    width: 60%;
    height: 25px;
    border-radius: 10px;
    border: 2px solid black;
    text-align: right;
    padding: 1px 5px;
  }
`;

export default function Indicator({ data }) {
  return (
    <StyledIndicator>
      <h3>{data.name}:</h3>
      <div className="bar" style={{ background: data.color }}>
        100/100
      </div>
    </StyledIndicator>
  );
}
