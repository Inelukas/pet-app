import styled from "styled-components";
import Pet from "../Pet/Pet";
import StyledLink from "@/components/StyledLink/StyledLink";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
`;

const StyledPetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  a {
    color: black;
    text-decoration: none;
  }
`;

export default function PetList({ petCollection }) {
  return (
    <StyledMain>
      {petCollection.length > 0 ? (
        <StyledPetList>
          {petCollection.map((pet) => {
            return <Pet key={pet.id} petData={pet} />;
          })}
        </StyledPetList>
      ) : (
        <h1>You don&apos;t have any pets.</h1>
      )}
      <StyledLink href="/create">Create</StyledLink>
    </StyledMain>
  );
}
