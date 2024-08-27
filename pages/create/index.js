import Form from "@/Component/Form/Form";
import PetSelection from "@/Component/PetSelection/PetSelection";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledCreatePetPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  gap: 30px;
  background-image: var(--create-image);
`;

const animalList = [
  { type: "Dog", icon: "🐶" },
  { type: "Cat", icon: "🐱" },
  { type: "Mouse", icon: "🐭" },
  { type: "Fox", icon: "🦊" },
  { type: "Frog", icon: "🐸" },
  { type: "Capybara", icon: "𐃶" },
];

export default function CreatePetPage() {
  const [currentPet, setCurrentPet] = useState(0);
  const router = useRouter();

  function handleChangePet(direction) {
    setCurrentPet(
      direction === "back"
        ? currentPet === 0
          ? animalList.length - 1
          : currentPet - 1
        : currentPet === animalList.length - 1
        ? 0
        : currentPet + 1
    );
  }

  function handleCreatePet(petData) {
    console.log(petData);
    // go to PetList and implement the add pet logic there
    // router.push("/");
  }

  function handleCancel() {
    router.push("/");
  }

  return (
    <StyledCreatePetPage>
      <PetSelection
        onChangePet={handleChangePet}
        animalList={animalList}
        currentPet={currentPet}
      />
      <Form
        animalList={animalList}
        currentPet={currentPet}
        onCreatePet={handleCreatePet}
        onCancel={handleCancel}
      />
    </StyledCreatePetPage>
  );
}
