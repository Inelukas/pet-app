import styled from "styled-components";
import Link from "next/link";
import Pet from "@/components/Pet/Pet";
import { GardenPageWrapper } from "@/components/LinkButtons/LinkButtons";

const GraveyardContainer = styled.section`
  position: relative;
  width: 100%;
  height: 90vh;
  background-image: url("/Background/graveyard.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export default function Graveyard({ petCollection, setPetCollection }) {
  const deadPets = petCollection.filter((pet) => !pet.alive && !pet.revived);

  const handleRevive = (petId) => {
    const updatedPets = petCollection.map((pet) => {
      if (pet.id === petId) {
        return {
          ...pet,
          alive: true,
          revived: true,
          status: {
            health: 0,
            hunger: 0,
            happiness: 0,
            energy: 0,
            intelligence: 0,
          },
          picture: url("/images/ghost.png"),
        };
      }
      return pet;
    });

    setPetCollection(updatedPets);
  };

  return (
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
  );
}
