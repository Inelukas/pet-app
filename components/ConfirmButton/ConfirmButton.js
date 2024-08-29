import styled from "styled-components";

export default styled.button`
  display: grid;
  place-content: center;
  width: 25vw;
  height: 10vh;
  max-width: 200px;
  font-size: 20px;
  border-radius: 10px;
  margin: 0 20px;
  box-shadow: 2px 2px black;
  cursor: pointer;
  background-color: var(--signal-color);
  background-image: var(--button-image);
  border: 1px solid #000000;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: var(--secondary-color);
  }
`;
