import styled from "styled-components";

const GameButton = styled.button`
  width: 80px;
  height: 40px;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 16px;
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;

  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
  }
`;

export default GameButton;
