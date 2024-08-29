import styled from "styled-components";
import pets from "@/lib/Data";
import Pet from "../Pet/Pet";
import Link from "next/link";

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

export default function PetList() {
  return pets.length > 0 ? (
    <StyledPetList>
      {pets.map((pet) => {
        return (
          <Link key={pet.id} href={`/PetDetails/${pet.id}`}>
            <Pet petData={pet} />
          </Link>
        );
      })}
    </StyledPetList>
  ) : (
    <h1>You don&apos;t have any pets.</h1>
  );
}
