import styled from "styled-components";
import Indicator from "../Indicator/Indicator";
import { useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 80vw;

  .confirm {
    width: 25vw;
    height: 10vh;
    max-width: 200px;
    font-size: 20px;
  }
`;

const StyledConfirmButtonContainer = styled.section`
  display: flex;
`;

const StyledConfirmButton = styled.button`
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
  width: 80%;
  max-width: 600px;
  height: 30%;
  min-height: 200px;
  border: 2px solid black;
  background: var(--secondary-color);
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;
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
`;

const StyledCharacteristicsContainer = styled.section`
  display: flex;
  gap: 10px;

  select {
    width: 20vw;
    max-width: 240px;
    border-radius: 5px;
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

const data = [
  { name: "Happiness", color: "pink", count: 100 },
  { name: "Energy", color: "yellow", count: 80 },
  { name: "Intelligence", color: "lightblue", count: 60 },
];

const characteristicOptions = [
  "smart",
  "stupid",
  "hyperactive",
  "lazy",
  "gluttonous",
  "picky",
  "cheerful",
  "depressed",
];

export default function Form({
  animalList,
  currentPet,
  onCreatePet,
  onCancel,
}) {
  const [characteristics, setCharacteristics] = useState({
    characteristic1: "",
    characteristic2: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    event.target.reset();
    setCharacteristics({
      characteristic1: "",
      characteristic2: "",
    });
    onCreatePet(data);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledMainField>
        <StyledFormElement>
          <label>Type:</label>
          <input name="type" value={animalList[currentPet].type} disabled />
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
            1:{" "}
            <select
              name="characteristic"
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
              {characteristicOptions.map((characteristic) => (
                <option
                  disabled={characteristics.characteristic2 === characteristic}
                >
                  {characteristic}
                </option>
              ))}
            </select>
            2:{" "}
            <select
              name="characteristic-2"
              value={characteristics.characteristic2}
              onChange={(event) =>
                setCharacteristics({
                  ...characteristics,
                  characteristic2: event.target.value,
                })
              }
            >
              <option value="">*none*</option>
              {characteristicOptions.map((characteristic) => (
                <option
                  disabled={characteristics.characteristic1 === characteristic}
                >
                  {characteristic}
                </option>
              ))}
            </select>
          </StyledCharacteristicsContainer>
        </StyledFormElement>
      </StyledMainField>
      <StyledIndicatorContainer>
        {data.map((indicator, index) => (
          <Indicator key={index} data={indicator} />
        ))}
      </StyledIndicatorContainer>
      <StyledConfirmButtonContainer>
        <StyledConfirmButton onClick={onCancel} type="button">
          Cancel
        </StyledConfirmButton>
        <StyledConfirmButton type="submit">Create</StyledConfirmButton>
      </StyledConfirmButtonContainer>
    </StyledForm>
  );
}
