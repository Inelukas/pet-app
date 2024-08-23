import styled from "styled-components";
import pets from "@/Lib/Data";
import Pet from "../Pet/Pet";

const StyledPetList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PetList() {
  return pets.length > 0 ? (
    <StyledPetList>
      {pets.map((pet, index) => {
        return <Pet key={index} petData={pet} />;
      })}
    </StyledPetList>
  ) : (
    <h1>The Pet is a lie</h1>
  );
}
