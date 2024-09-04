import styled from "styled-components";
import Pet from "../Pet/Pet";
import StyledLink from "@/components/StyledLink/StyledLink";
import Link from "next/link";
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
      <StyledLink href="/create">
        <Image src={createIcon} alt="Create Icon" width={30} />
      </StyledLink>

      <StyledLink href="/garden">Garden</StyledLink>
    </StyledMain>
  );
}
