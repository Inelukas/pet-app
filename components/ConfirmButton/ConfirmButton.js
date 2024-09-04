import styled from "styled-components";

export default styled.button`
  display: grid;
  place-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 100px;
  margin: 0 20px;
  box-shadow: 2px 2px #000000;
  cursor: pointer;
  background-color: var(--signal-color);
  background-image: var(--button-image);
  border: 1px solid #000000;
  font-size: 1.5rem;

  @media screen and (min-width: 600px) {
    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
`;
