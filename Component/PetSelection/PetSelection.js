import { useState } from "react";
import styled from "styled-components";

const StyledPetSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;

  .pet-icon {
    width: 100px;
    height: 100px;
    display: grid;
    place-content: center;
    border-radius: 20px;
    background: var(--secondary-color);
    font-size: 80px;
    box-shadow: 3px 3px 3px 3px black;
    cursor: pointer;
  }
`;

export default function PetSelection({ onChangePet, animalList, currentPet }) {
  return (
    <StyledPetSelection>
      <button onClick={() => onChangePet("back")}>←</button>
      <div onClick={() => onChangePet("next")} className="pet-icon">
        {animalList[currentPet].icon}
      </div>
      <button onClick={() => onChangePet("next")}>→</button>
    </StyledPetSelection>
  );
}
