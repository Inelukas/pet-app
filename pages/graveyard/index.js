import styled from "styled-components";
import Link from "next/link";
import Pet from "@/components/Pet/Pet";
import { GardenPageWrapper } from "@/components/LinkButtons/LinkButtons";
import { GardenContainer } from "../garden";
import { StyledPetList } from "../pet-list";

const GraveyardMain = styled.main`
  display: flex;
  justify-content: center;
`;

const GraveyardContainer = styled(GardenContainer)`
  background-image: url("/Background/graveyard.png");
  height: 100%;
  min-height: 100vh;
`;

const GraveyardButtonWrapper = styled(GardenPageWrapper)`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export default function Graveyard({ petCollection, onPetCollection }) {
  const deadPets = petCollection.filter((pet) => !pet.alive && !pet.revived);

  function handleRevive(petId) {
    const updatedPets = petCollection.map(function (pet) {
      if (pet.id === petId) {
        return {
          ...pet,
          alive: false,
          revived: true,
          dying: false,
          animations: {
            slug: "ghost",
            size: "32",
            spriteNumber: { normal: 4, sleepy: 4 },
            scale: 3,
            position: 100,
          },
          status: {
            health: 0,
            hunger: 0,
            happiness: 0,
            energy: 0,
            intelligence: 0,
          },
          picture: "/assets/images/ghost_front.png",
          image: "/assets/images/ghost.png",
        };
      }
      return pet;
    });

    onPetCollection(updatedPets);
  }

  return (
    <GraveyardMain>
      <GraveyardContainer>
        <StyledPetList>
          {deadPets.length > 0 ? (
            <>
              {deadPets.map((pet) => (
                <Pet petData={pet} key={pet.id} onGraveyard={handleRevive} />
              ))}
            </>
          ) : (
            ``
          )}

          <GraveyardButtonWrapper>
            <Link
              href="/pet-list"
              aria-label="A Staple of Books indicating List"
            >
              📚
            </Link>
          </GraveyardButtonWrapper>
        </StyledPetList>
      </GraveyardContainer>
    </GraveyardMain>
  );
}
