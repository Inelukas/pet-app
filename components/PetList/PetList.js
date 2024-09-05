import styled from "styled-components";
import Pet from "../Pet/Pet";
import StyledLink from "@/components/StyledLink/StyledLink";
import Link from "next/link";
import { GardenPageLink } from "@/components/LinkButtons/LinkButtons";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
`;

const StyledPetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  a {
    color: black;
    text-decoration: none;
  }
`;

export default function PetList({ petCollection }) {
  return (
    <StyledMain>
      {petCollection.length > 0 ? (
        <StyledPetList>
          {petCollection.map((pet) => {
            return (
              <Link key={pet.id} href={`/PetDetails/${pet.id}`}>
                <Pet petData={pet} />
              </Link>
            );
          })}
        </StyledPetList>
      ) : (
        <h1>You don&apos;t have any pets.</h1>
      )}
      <StyledLink href="/create">Create</StyledLink>
      <GardenPageLink>
        <Link
          href="/garden"
          role="img"
          aria-label="A golf hole indicating the Garden"
        >
          ⛳
        </Link>
      </GardenPageLink>
    </StyledMain>
  );
}
