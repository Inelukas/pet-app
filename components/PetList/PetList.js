import styled from "styled-components";
import pets from "@/lib/Data";
import Pet from "../Pet/Pet";

const StyledPetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

export default function PetList() {
  return pets.length > 0 ? (
    <StyledPetList>
      {pets.map((pet) => {
        return <Pet key={pet.id} petData={pet} />;
      })}
    </StyledPetList>
  ) : (
    <h1>You don&apos;t have any pets.</h1>
  );
}
