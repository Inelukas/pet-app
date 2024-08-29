import PetSelection from "@/components/PetSelection/PetSelection";
import { animalList } from "@/lib/Data";
import { useRef, useState } from "react";
import styled from "styled-components";
import Indicator from "@/components/Indicator/Indicator";
import StyledLink from "@/components/StyledLink/StyledLink";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import { CreatePetForm } from "@/components/CreatePetForm/CreatePetForm";

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

const StyledConfirmButtonContainer = styled.div`
  display: flex;
`;

const StyledIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 70%;
  max-width: 600px;
  height: 30%;
  min-height: 200px;
  border: 2px solid black;
  background: var(--secondary-color);
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;

  @media screen and (min-width: 375px) {
    font-size: 0.8rem;
  }
`;

export default function CreatePetPage({ onCreatePet }) {
  const [currentPet, setCurrentPet] = useState(0);
  const formRef = useRef(null);

  const [characteristics, setCharacteristics] = useState({
    characteristic1: "",
    characteristic2: "",
  });

  function handlePreviousPet() {
    const prevPetId = currentPet > 0 ? currentPet - 1 : animalList.length - 1;
    setCurrentPet(prevPetId);
  }

  function handleNextPet() {
    const nextPetId = (currentPet + 1) % animalList.length;
    setCurrentPet(nextPetId);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const petData = {
      ...data,
      type: animalList[currentPet].type,
      picture: animalList[currentPet].icon,
      status: animalList[currentPet].indicators,
    };
    event.target.reset();
    setCharacteristics({
      characteristic1: "",
      characteristic2: "",
    });
    onCreatePet(petData);
  }

  function handleExternalButtonClick() {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  return (
    <StyledCreatePage>
      <PetSelection
        onPreviousPet={handlePreviousPet}
        onNextPet={handleNextPet}
        animalList={animalList}
        currentPet={currentPet}
        name="type"
      />
      <CreatePetForm
        ref={formRef}
        onSubmit={handleSubmit}
        currentPet={currentPet}
        characteristics={characteristics}
        setCharacteristics={setCharacteristics}
      />
      <StyledIndicatorContainer>
        {animalList[currentPet].indicators.map((indicator, index) => (
          <Indicator key={index} data={indicator} />
        ))}
      </StyledIndicatorContainer>
      <StyledConfirmButtonContainer>
        <StyledLink href="/">Cancel</StyledLink>
        <ConfirmButton type="submit" onClick={handleExternalButtonClick}>
          Create
        </ConfirmButton>
      </StyledConfirmButtonContainer>
    </StyledCreatePage>
  );
}
