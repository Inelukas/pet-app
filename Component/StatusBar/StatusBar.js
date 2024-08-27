import React from "react";
import styled from "styled-components";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
`;

const VerticalBar = styled.div`
  width: 20px;
  height: 100px;
  background-color: transparent;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const BarFill = styled.div`
  width: 100%;
  background-color: ${({ color }) =>
    color || "hotpink"}; //hotpink is a placeholder
  height: ${({ value }) => value}%;
`;

const StatusBar = ({ value, color }) => {
  return (
    <BarContainer>
      <VerticalBar>
        <BarFill value={value} color={color} />
      </VerticalBar>
    </BarContainer>
  );
};

export default StatusBar;
