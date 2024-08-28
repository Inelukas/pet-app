import PetSelection from "@/Component/PetSelection/PetSelection";
import { indicatorData, characteristicOptions, animalList } from "@/Lib/Data";
import { useState } from "react";
import styled from "styled-components";
import Indicator from "@/Component/Indicator/Indicator";
import Link from "next/link";

const StyledCreatePage = styled.main`
  background-image: var(--create-image);
  height: 100%;
  width: 100%;
`;

const StyledForm = styled.form`
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

const StyledConfirmButtonContainer = styled.section`
  display: flex;

  a {
    display: grid;
    place-content: center;
    width: 25vw;
    height: 10vh;
    max-width: 200px;
    font-size: 20px;
    border-radius: 10px;
    margin: 0 20px;
    box-shadow: 2px 2px black;
    cursor: pointer;
    background-color: var(--signal-color);
    background-image: var(--button-image);
    color: #000000;
    text-decoration: none;
    font-family: sans-serif;
    border: 1px solid #000000;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
`;

const StyledReturnButton = styled.button`
  display: grid;
  place-content: center;
  width: 25vw;
  height: 10vh;
  max-width: 200px;
  font-size: 20px;
  border-radius: 10px;
  margin: 0 20px;
  box-shadow: 2px 2px black;
  cursor: pointer;
  background-color: var(--signal-color);
  background-image: var(--button-image);
  border: 1px solid #000000;

  a {
    color: #000000;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: var(--secondary-color);
  }
`;

const StyledIndicatorContainer = styled.section`
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

  @media screen and (max-width: 667px) {
    font-size: 12px;
  }
`;

const StyledMainField = styled.section`
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
  font-size: 18px;
  font-weight: 800;

  @media screen and (max-width: 667px) {
    font-size: 13px;
  }
`;

const StyledCharacteristicsContainer = styled.section`
  display: flex;
  gap: 10px;

  select {
    width: 22vw;
    max-width: 240px;
    border-radius: 5px;

    @media screen and (max-width: 667px) {
      font-size: 12px;
    }
  }
`;

const StyledFormElement = styled.section`
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

export default function CreatePetPage({ onCreatePet }) {
  const [currentPet, setCurrentPet] = useState(0);

  const [characteristics, setCharacteristics] = useState({
    characteristic1: "",
    characteristic2: "",
  });

  function handleChangePet(direction) {
    // setCurrentPet(
    //   direction === "back"
    //     ? currentPet === 0
    //       ? animalList.length - 1
    //       : currentPet - 1
    //     : currentPet === animalList.length - 1
    //     ? 0
    //     : currentPet + 1
    // );

    let newPetIndex;
    direction === "back" &&
      currentPet === 0 &&
      (newPetIndex = animalList.length - 1);
    direction === "back" && currentPet !== 0 && (newPetIndex = currentPet - 1);
    direction !== "back" &&
      currentPet === animalList.length - 1 &&
      (newPetIndex = 0);
    direction !== "back" &&
      currentPet !== animalList.length - 1 &&
      (newPetIndex = currentPet + 1);
    setCurrentPet(newPetIndex);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const petData = {
      ...data,
      type: animalList[currentPet].type,
      picture: animalList[currentPet].icon,
    };
    event.target.reset();
    setCharacteristics({
      characteristic1: "",
      characteristic2: "",
    });
    onCreatePet(petData);
  }

  return (
    <StyledCreatePage>
      <StyledForm onSubmit={handleSubmit}>
        <PetSelection
          onChangePet={handleChangePet}
          animalList={animalList}
          currentPet={currentPet}
          name="type"
        />
        <StyledMainField>
          <StyledFormElement>
            <label htmlFor="type">Type:</label>
            <input
              name="type"
              id="type"
              value={animalList[currentPet].type}
              disabled
            />
          </StyledFormElement>
          <StyledFormElement>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              id="name"
              placeholder="Samantha"
              maxLength={30}
              required
            />
          </StyledFormElement>
          <StyledFormElement>
            <label htmlFor="characteristic">Characteristics:</label>
            <StyledCharacteristicsContainer>
              <select
                name="characteristic1"
                id="characteristic"
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
                      characteristics.characteristic2 ===
                        option.characteristic ||
                      characteristics.characteristic2 === option.opposite
                    }
                  >
                    {option.characteristic}
                  </option>
                ))}
              </select>
              <select
                name="characteristic2"
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
                      characteristics.characteristic1 ===
                        option.characteristic ||
                      characteristics.characteristic1 === option.opposite
                    }
                  >
                    {option.characteristic}
                  </option>
                ))}
              </select>
            </StyledCharacteristicsContainer>
          </StyledFormElement>
        </StyledMainField>
        <StyledIndicatorContainer>
          {animalList[currentPet].indicators.map((indicator, index) => (
            <Indicator key={index} data={indicator} />
          ))}
        </StyledIndicatorContainer>
        <StyledConfirmButtonContainer>
          <Link href="/">Cancel</Link>
          <StyledReturnButton type="submit">Create</StyledReturnButton>
        </StyledConfirmButtonContainer>
      </StyledForm>
    </StyledCreatePage>
  );
}
