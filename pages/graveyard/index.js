import styled from "styled-components";
import Link from "next/link";
import Pet from "@/components/Pet/Pet";
import { GardenPageWrapper } from "@/components/LinkButtons/LinkButtons";
import { GardenContainer, StyledMain } from "../garden";

const GraveyardContainer = styled(GardenContainer)`
  background-image: url("/Background/graveyard.png");
`;

const StyledGraveyardMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function Graveyard({ petCollection, setPetCollection }) {
  const deadPets = petCollection.filter((pet) => !pet.alive && !pet.revived);

  const handleRevive = (petId) => {
    const updatedPets = petCollection.map((pet) => {
      if (pet.id === petId) {
        {
          return {
            ...pet,
            alive: false,
            revived: true,
            dying: false,
            status: {
              health: 0,
              hunger: 0,
              happiness: 0,
              energy: 0,
              intelligence: 0,
            },
            picture: "/images/ghost.png",
          };
        }
      }
      return pet;
    });

    setPetCollection(updatedPets);
  };

  return (
    <StyledGraveyardMain>
      <GraveyardContainer>
        {deadPets.length > 0 ? (
          <>
            {deadPets.map((pet) => (
              <Pet petData={pet} key={pet.id} onGraveyard={handleRevive} />
            ))}
          </>
        ) : (
          <h1>No pets in the graveyard.</h1>
        )}

        <GardenPageWrapper>
          <Link href="/pet-list" aria-label="A Staple of Books indicating List">
            📚
          </Link>
        </GardenPageWrapper>
      </GraveyardContainer>
    </StyledGraveyardMain>
  );
}
