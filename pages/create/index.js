import Form from "@/Component/Form/Form";
import Indicator from "@/Component/Indicator/Indicator";
import PetSelection from "@/Component/PetSelection/PetSelection";
import { useState } from "react";
import styled from "styled-components";

const StyledCreatePetPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  gap: 30px;
  background-image: var(--create-image);

  button {
    width: 10vw;
    height: 5vh;
    border-radius: 10px;
    margin: 0 20px;
    box-shadow: 2px 2px black;
    cursor: pointer;
    background-color: var(--signal-color);
    background-image: var(--button-image);

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
`;

const animalList = [
  { type: "Dog", icon: "🐶" },
  { type: "Cat", icon: "🐱" },
  { type: "Mouse", icon: "🐭" },
  { type: "Fox", icon: "🦊" },
  { type: "Frog", icon: "🐸" },
];

export default function CreatePetPage() {
  const [currentPet, setCurrentPet] = useState(0);

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

  return (
    <StyledCreatePetPage>
      <PetSelection
        onChangePet={handleChangePet}
        animalList={animalList}
        currentPet={currentPet}
      />
      <Form animalList={animalList} currentPet={currentPet} />
    </StyledCreatePetPage>
  );
}
