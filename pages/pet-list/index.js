import styled from "styled-components";
import Pet from "@/components/Pet/Pet";
import StyledLink from "@/components/StyledLink/StyledLink";
import Link from "next/link";
import { GardenPageWrapper } from "@/components/LinkButtons/LinkButtons";
import { AdjustedListPageWrapper } from "../garden";
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

export default function PetList({ petCollection }) {
  const livingAndRevivedPets = petCollection.filter(
    (pet) => pet.alive || pet.revived
  );

  return (
    <StyledMain>
      {livingAndRevivedPets.length > 0 ? (
        <StyledPetList>
          {livingAndRevivedPets.map((pet) => {
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
      </GardenPageWrapper>
      <AdjustedListPageWrapper>
        <Link href="/graveyard" aria-label="Coffing indicating Graveyard">
          ⚰️
        </Link>
      </AdjustedListPageWrapper>

      <StyledLink href="/create">
        <Image src={createIcon} alt="Create Icon" width={30} />
      </StyledLink>
    </StyledMain>
  );
}
