import Link from "next/link";
import styled from "styled-components";
export default styled(Link)`
  display: grid;
  place-content: center;
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
  border-radius: 10px;
  margin: 0 20px;

  background: var(--secondary-gradient);

  font-family: Ink Free;

  color: black;
  text-decoration: none;
  transition: all 0.2s ease-in-out 0ms;
  outline: none;
  box-shadow: var(--global-shadow);
  &:hover {
    background: var(--signal-gradient);

    transform: scale(0.95);
  }
  &:active {
    background: var(--primary-gradient);
  }
  @media screen and (min-width: 600px) {
    transform: scale(0.9);
    font-size: 1.5rem;
  }
`;
