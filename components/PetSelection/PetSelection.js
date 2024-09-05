import styled from "styled-components";

const StyledPetSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
  width: 100vw;
`;

const StyledSelectionButton = styled.button`
  display: grid;
  place-content: center;
  width: 4rem;
  max-width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 0 20px;
  box-shadow: 2px 2px #000000;
  cursor: pointer;
  background-color: var(--signal-color);
  background-image: var(--button-image);
  font-size: 2rem;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: var(--secondary-color);
  }
`;

const StyledPetIcon = styled.div`
  width: 120px;
  height: 120px;
  display: grid;
  place-content: center;
  border-radius: 20px;
  background: var(--secondary-color);
  font-size: 80px;
  box-shadow: 3px 3px 3px 3px #000000;
  cursor: pointer;
`;

export default function PetSelection({
  onPreviousPet,
  onNextPet,
  animalList,
  currentPet,
  hideButtons = false,
}) {
  return (
    <StyledPetSelection>
      {!hideButtons && (
        <StyledSelectionButton type="button" onClick={onPreviousPet}>
          ←
        </StyledSelectionButton>
      )}
      <StyledPetIcon onClick={hideButtons ? null : onNextPet}>
        {animalList[currentPet].icon}
      </StyledPetIcon>
      {!hideButtons && (
        <StyledSelectionButton type="button" onClick={onNextPet}>
          →
        </StyledSelectionButton>
      )}
    </StyledPetSelection>
  );
}
