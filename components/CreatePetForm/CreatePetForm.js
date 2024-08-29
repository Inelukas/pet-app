import { animalList, characteristicOptions } from "@/lib/Data";
import { forwardRef } from "react";
import styled from "styled-components";

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
  font-size: 1rem;
  font-weight: 800;

  @media screen and (min-width: 375px) {
    font-size: 0.8rem;
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

export const CreatePetForm = forwardRef(
  ({ onSubmit, currentPet, characteristics, setCharacteristics }, ref) => {
    return (
      <StyledForm onSubmit={onSubmit} ref={ref}>
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
    );
  }
);
