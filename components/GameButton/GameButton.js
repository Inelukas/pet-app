import styled from "styled-components";

const GameButton = styled.button`
  width: 80px;
  height: 40px;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 10px;

  &:hover {
    background-color: var(--signal-color);
  }
`;

export default GameButton;
