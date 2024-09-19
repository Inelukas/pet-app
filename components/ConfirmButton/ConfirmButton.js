import styled from "styled-components";

export default styled.button`
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  border-radius: 100px;

  box-shadow: var(--global-shadow);
  cursor: pointer;
  background: var(--secondary-gradient);
  border: none;
  font-size: 1.5rem;

  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--signal-gradient);
    box-shadow: var(--global-shadow);
    transform: scale(1.1);
  }
  &:active {
    background: var(--secondary-gradient);
  }
`;
