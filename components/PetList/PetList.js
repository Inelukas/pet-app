import styled from "styled-components";
import pets from "@/lib/Data";
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
`;

export default function PetList({ petCollection }) {
  return petCollection.length > 0 ? (
    <StyledMain>
      <StyledPetList>
        {petCollection.map((pet) => {
          return <Pet key={pet.id} petData={pet} />;
        })}
      </StyledPetList>
      <StyledLink targetSource="/create">Create</StyledLink>
    </StyledMain>
  ) : (
    <h1>You don&apos;t have any pets.</h1>
  );
}
