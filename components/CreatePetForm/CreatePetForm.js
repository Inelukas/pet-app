import { useState } from "react";
import styled from "styled-components";
import PetSelection from "../PetSelection/PetSelection";
import Indicator from "../Indicator/Indicator";
import StyledLink from "../StyledLink/StyledLink";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import { animalList, characteristicOptions } from "@/lib/Data";
import { useEffect } from "react";

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
  padding: 0 15px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 800px;
  height: 30vh;
  min-height: 250px;
  border: 3px solid black;
  padding: 10px;
  background: var(--secondary-color);
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;
  font-size: 0.8rem;
  font-weight: 800;

  @media screen and (min-width: 600px) {
    font-size: 1rem;
  }
`;

const StyledFormArticle = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;

  label,
  input {
    border: 2px solid black;
    padding: 5px;
    width: 70%;
    border-radius: 10px;
  }

  label {
    width: 20%;
    border: none;
  }
`;

const StyledCharacteristicsContainer = styled.div`
  display: flex;
  gap: 10px;

  select {
    width: 22vw;
    max-width: 240px;
    border-radius: 5px;

    @media screen and (min-width: 375px) {
      font-size: 0.7rem;
    }
  }
`;

export default function CreatePetForm({
  initialData,
  onCreatePet,
  buttonLabel = "Create",
  hideButtons = false,
  onUpdatePet,
}) {
  const [currentPet, setCurrentPet] = useState(0);
  const [characteristics, setCharacteristics] = useState({
    characteristic1: "",
    characteristic2: "",
  });

  const [petName, setPetName] = useState("");

  useEffect(() => {
    if (initialData) {
      const petIndex = animalList.findIndex(
        (animal) => animal.type === initialData.type
      );
      setCurrentPet(petIndex);
      setCharacteristics({
        characteristic1: initialData.characteristics[0] || "",
        characteristic2: initialData.characteristics[1] || "",
      });
      setPetName(initialData.name);
    }
  }, [initialData]);

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
    const petInfo = animalList[currentPet];
    const [happiness, energy, intelligence] = petInfo.indicators;
    const petData = {
      ...data,
      id: initialData?.id,
      type: petInfo.type,
      picture: petInfo.icon,
      characteristics: [
        characteristics.characteristic1,
        characteristics.characteristic2,
      ],
      status: {
        [happiness.name]: happiness.count,
        [energy.name]: energy.count,
        [intelligence.name]: intelligence.count,
        health: 100,
        hunger: 50,
      },
    };

    if (initialData) {
      onUpdatePet(petData);
    } else {
      onCreatePet(petData);
    }

    event.target.reset();
    setCharacteristics({
      characteristic1: "",
      characteristic2: "",
    });
    setPetName("");
  }

  return (
    <>
      <PetSelection
        onPreviousPet={handlePreviousPet}
        onNextPet={handleNextPet}
        animalList={animalList}
        currentPet={currentPet}
        hideButtons={hideButtons}
      />
      <StyledForm onSubmit={handleSubmit} id="create-pet">
        <StyledFormArticle>
          <label htmlFor="type">Type:</label>
          <input
            name="type"
            id="type"
            value={animalList[currentPet].type}
            disabled
          />
        </StyledFormArticle>
        <StyledFormArticle>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            value={petName}
            placeholder="Samantha"
            maxLength={30}
            required
            onChange={(e) => setPetName(e.target.value)}
          />
        </StyledFormArticle>
        <StyledFormArticle>
          <label htmlFor="characteristic">Characteristics:</label>
          <StyledCharacteristicsContainer>
            <select
              name="characteristic1"
              id="characteristic"
              aria-label="Characteristic 1"
              value={characteristics.characteristic1}
              onChange={(event) =>
                setCharacteristics({
                  ...characteristics,
                  characteristic1: event.target.value,
                })
              }
              required
            >
              <option value="" disabled>
                Choose Nr. 1
              </option>
              {characteristicOptions.map((option, index) => (
                <option
                  key={index}
                  disabled={
                    characteristics.characteristic2 === option.characteristic ||
                    characteristics.characteristic2 === option.opposite
                  }
                >
                  {option.characteristic}
                </option>
              ))}
            </select>
            <select
              name="characteristic2"
              aria-label="Characteristic 2"
              value={characteristics.characteristic2}
              onChange={(event) =>
                setCharacteristics({
                  ...characteristics,
                  characteristic2: event.target.value,
                })
              }
            >
              <option value="">*none*</option>
              {characteristicOptions.map((option, index) => (
                <option
                  key={index}
                  disabled={
                    characteristics.characteristic1 === option.characteristic ||
                    characteristics.characteristic1 === option.opposite
                  }
                >
                  {option.characteristic}
                </option>
              ))}
            </select>
          </StyledCharacteristicsContainer>
        </StyledFormArticle>
      </StyledForm>
      <StyledIndicatorContainer>
        {animalList[currentPet].indicators.map((indicator, index) => (
          <Indicator key={index} data={indicator} />
        ))}
      </StyledIndicatorContainer>
      <StyledConfirmButtonContainer>
        <StyledLink href="/">Cancel</StyledLink>
        <ConfirmButton type="submit" form="create-pet">
          {buttonLabel}
        </ConfirmButton>
      </StyledConfirmButtonContainer>
    </>
  );
}
