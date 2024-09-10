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

export default function Graveyard({ petCollection }) {
  const deadPets = petCollection.filter((pet) => !pet.alive);

  const handleRevive = (petId) => {
    console.log("Reviving pet with ID:", petId);
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
