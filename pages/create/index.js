import styled from "styled-components";
import CreatePetForm from "@/components/CreatePetForm/CreatePetForm";

const StyledCreatePage = styled.main`
  background-image: var(--create-image);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10% 0;

  @media screen and (min-width: 1024px) {
    padding: 5% 0;
  }
`;

export default function CreatePetPage({ onCreatePet }) {
  return (
    <StyledCreatePage>
      <CreatePetForm onCreatePet={onCreatePet} />
    </StyledCreatePage>
  );
}
