import styled from "styled-components";

const StyledPetSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;

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

const StyledPetIcon = styled.div`
  width: 100px;
  height: 100px;
  display: grid;
  place-content: center;
  border-radius: 20px;
  background: var(--secondary-color);
  font-size: 80px;
  box-shadow: 3px 3px 3px 3px black;
  cursor: pointer;
`;

export default function PetSelection({ onChangePet, animalList, currentPet }) {
  return (
    <StyledPetSelection>
      <button onClick={() => onChangePet("back")}>←</button>
      <StyledPetIcon onClick={() => onChangePet("next")}>
        {animalList[currentPet].icon}
      </StyledPetIcon>
      <button onClick={() => onChangePet("next")}>→</button>
    </StyledPetSelection>
  );
}
