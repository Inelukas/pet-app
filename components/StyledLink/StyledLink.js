import Link from "next/link";
import styled from "styled-components";

const StyledAnchor = styled.div`
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
  font-family: sans-serif;
  border: 1px solid #000000;

  a {
    color: #000000;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: var(--secondary-color);
  }
`;

export default function StyledLink({ targetSource, children }) {
  return (
    <StyledAnchor>
      <Link href={targetSource}>{children}</Link>
    </StyledAnchor>
  );
}

// style={{ textDecoration: "none" }}
