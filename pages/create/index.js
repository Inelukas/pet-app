import PetSelection from "@/components/PetSelection/PetSelection";
import { characteristicOptions, animalList } from "@/lib/Data";
import { useRef, useState } from "react";
import styled from "styled-components";
import Indicator from "@/components/Indicator/Indicator";
import StyledLink from "@/components/StyledLink/StyledLink";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";

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
  font-size: 18px;
  font-weight: 800;

  @media screen and (min-width: 667px) {
    font-size: 13px;
  }
`;

const StyledConfirmButtonContainer = styled.section`
  display: flex;
`;

const StyledIndicatorContainer = styled.article`
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

  @media screen and (min-width: 667px) {
    font-size: 12px;
  }
`;

const StyledCharacteristicsContainer = styled.section`
  display: flex;
  gap: 10px;

  select {
    width: 22vw;
    max-width: 240px;
    border-radius: 5px;

    @media screen and (min-width: 667px) {
      font-size: 12px;
    }
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
    };
    event.target.reset();
    setCharacteristics({
      characteristic1: "",
      characteristic2: "",
    });
    onCreatePet(petData);
  }

  const handleExternalButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <StyledCreatePage>
      <PetSelection
        onPreviousPet={handlePreviousPet}
        onNextPet={handleNextPet}
        animalList={animalList}
        currentPet={currentPet}
        name="type"
      />
      <StyledForm ref={formRef} onSubmit={handleSubmit}>
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
            placeholder="Samantha"
            maxLength={30}
            required
          />
        </StyledFormArticle>
        <StyledFormArticle>
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
                    characteristics.characteristic2 === option.characteristic ||
                    characteristics.characteristic2 === option.opposite
                  }
                >
                  {option.characteristic}
                </option>
              ))}
            </select>
            <label
              htmlFor="characteristic2"
              style={{
                display: "none",
              }}
            >
              Characteristic 2
            </label>
            <select
              name="characteristic2"
              id="characteristic2"
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
        <StyledLink targetSource="/">Cancel</StyledLink>
        <ConfirmButton type="button" onClick={handleExternalButtonClick}>
          Create
        </ConfirmButton>
      </StyledConfirmButtonContainer>
    </StyledCreatePage>
  );
}
