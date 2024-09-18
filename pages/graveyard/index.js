import styled from "styled-components";
import Pet from "@/components/Pet/Pet";
import { GardenContainer } from "../garden";
import { StyledPetList } from "../pet-list";

const GraveyardMain = styled.main`
  display: flex;
  justify-content: center;
  background: var(--graveyard-gradient);
  background-size: contain;
  min-height: 100vh;
  background-repeat: repeat;
`;

const GraveyardContainer = styled(GardenContainer)`
  background-image: url("/Background/graveyard.png");
  background-size: 100% 100%;
  padding-top: 80px;
  background-repeat: repeat;
  min-height: 100vh;
  @media (min-width: 1200px) {
    max-width: 800px;
  }

  @media (min-width: 650px) {
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
`;

export default function Graveyard({ petCollection, onPetCollection }) {
  const deadPets = petCollection.filter(
    (pet) => !pet.isAlive && !pet.isRevived
  );

  function handleRevive(petId) {
    const updatedPets = petCollection.map(function (pet) {
      if (pet.id === petId) {
        return {
          ...pet,
          isAlive: false,
          isRevived: true,
          isDying: false,
          animations: {
            slug: "ghost",
            size: "32",
            spriteNumber: { normal: 4, sleepy: 4 },
            scale: 3,
            position: 100,
          },
          status: {
            Health: 0,
            Hunger: 0,
            Happiness: 0,
            Energy: 0,
            Intelligence: 0,
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
        </StyledPetList>
      </GraveyardContainer>
    </GraveyardMain>
  );
}
