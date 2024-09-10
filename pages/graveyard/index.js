import styled from "styled-components";
import Link from "next/link";

const GraveyardContainer = styled.section`
  position: relative;
  width: 100%;
  height: 90vh;
  background-image: url("/Background/graveyard.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Graveyard() {
  return (
    <GraveyardContainer>
      <Link href="/pet-list" aria-label="Staple of Books indicating List">
        📚
      </Link>
    </GraveyardContainer>
  );
}
