import Link from "next/link";
import styled from "styled-components";

export default styled(Link)`
  display: grid;
  place-content: center;
  width: 100px;
  height: 50px;
  font-size: 0.8rem;
  border-radius: 10px;
  margin: 0 20px;
  box-shadow: 2px 2px black;
  cursor: pointer;
  background-color: var(--signal-color);
  background-image: var(--button-image);
  font-family: sans-serif;
  border: 1px solid #000000;
  color: #000000;
  text-decoration: none;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: var(--secondary-color);
  }
`;
