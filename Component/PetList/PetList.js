import styled from "styled-components";
import Pet from "../Pet/Pet";
import Link from "next/link";

const StyledPetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: 5% 0;
`;

const StyledCreateButton = styled.button`
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

export default function PetList({ petCollection }) {
  return petCollection.length > 0 ? (
    <StyledPetList>
      {petCollection.map((pet) => {
        return <Pet key={pet.id} petData={pet} />;
      })}
      <StyledCreateButton>
        <Link href="/create">Create Pet</Link>
      </StyledCreateButton>
    </StyledPetList>
  ) : (
    <h1>You don&apos;t have any pets.</h1>
  );
}
