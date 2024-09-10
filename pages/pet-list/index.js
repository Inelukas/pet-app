import styled from "styled-components";
import Pet from "@/components/Pet/Pet";
import StyledLink from "@/components/StyledLink/StyledLink";
import Link from "next/link";
import { GardenPageWrapper } from "@/components/LinkButtons/LinkButtons";
import createIcon from "../../public/assets/create.png";
import Image from "next/image";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vh 0;
  gap: 20px;
`;

const StyledPetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const StyledPet = styled(Link)`
  color: #000000;
  text-decoration: none;
`;

export const LeftCornerWrapper = styled(GardenPageWrapper)`
  left: 10px;

  box-shadow: 2px 2px #000000;
  background-color: lightgreen;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
  opacity: 75%;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    background-color: var(--secondary-color);
  }
`;

export const RightCornerWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 4rem;
  height: 4rem;
  box-shadow: 2px 2px #000000;
  background-color: lightcoral;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
  opacity: 75%;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    background-color: var(--secondary-color);
  }
`;

export default function PetList({ petCollection }) {
  return (
    <StyledMain>
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

      <GardenPageWrapper>
        <Link href="/garden" aria-label="A golf hole indicating the Garden">
          ⛳
        </Link>

        <Link href="/graveyard" aria-label="A coffin indicating the Graveyard">
          ⚰️
        </Link>
      </GardenPageWrapper>

      <StyledLink href="/create">
        <Image src={createIcon} alt="Create Icon" width={30} />
      </StyledLink>
    </StyledMain>
  );
}
