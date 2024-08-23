import styled from "styled-components";
import pets from "@/Lib/Data";
import Pet from "../Pet/Pet";

const StyledPetList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PetList() {
  return (
    <StyledPetList>
      {pets.map((pet, index) => {
        return <Pet key={index} petData={pet} />;
      })}
    </StyledPetList>
  );
}
