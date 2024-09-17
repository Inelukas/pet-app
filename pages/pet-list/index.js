import styled from "styled-components";
import Pet from "@/components/Pet/Pet";
import Link from "next/link";

const PetListPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vh 0;
  gap: 20px;
  position: relative;
`;

const StyledPetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 80vh;
`;

const StyledPet = styled(Link)`
  color: #000000;
  text-decoration: none;
`;

export default function PetList({ petCollection }) {
  return (
    <PetListPage>
      {petCollection.length > 0 ? (
        <StyledPetList>
          {petCollection.map((pet) => {
            return (
              <StyledPet key={pet.id} href={`/pet-details/${pet.id}`}>
                <Pet petData={pet} />
              </StyledPet>
            );
          })}
        </StyledPetList>
      ) : (
        <h1>You don&apos;t have any pets.</h1>
      )}
    </PetListPage>
  );
}
