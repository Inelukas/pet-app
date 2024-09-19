import styled from "styled-components";
import CreatePetForm from "@/components/CreatePetForm/CreatePetForm";

export const StyledCreatePage = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 5vh 0;
`;

export default function CreatePetPage({ onCreatePet, animalChoices }) {
  return (
    <StyledCreatePage>
      <CreatePetForm
        onCreatePet={onCreatePet}
        createPet={true}
        animalChoices={animalChoices}
      />
    </StyledCreatePage>
  );
}
