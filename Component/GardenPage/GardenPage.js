import React, { useState } from "react";
import styled from "styled-components";
import pets from "@/Lib/Data";

const GardenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  background-image: url("Background/pet-app-background-dalle.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PetDisplay = styled.div`
  position: relative;
  left: 30%;
  top: 50%;
  font-size: 8em;
  color: var(--text-color);
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: var(--neutral-color);
  border-radius: 8px;
  margin: auto;
  max-width: 600px;
`;

const NavButton = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--signal-color);
  }
`;

const GardenPage = () => {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  const handlePrevPet = () => {
    setCurrentPetIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : pets.length - 1
    );
  };

  const handleNextPet = () => {
    setCurrentPetIndex((prevIndex) => (prevIndex + 1) % pets.length);
  };

  const currentPet = pets[currentPetIndex];

  return (
    <>
      <GardenContainer>
        <PetDisplay>{currentPet.picture}</PetDisplay>
      </GardenContainer>
      <NavbarContainer>
        <NavButton onClick={handlePrevPet}>Prev Pet</NavButton>
        <NavButton>{currentPet.picture}</NavButton>
        <NavButton onClick={handleNextPet}>Next Pet</NavButton>
      </NavbarContainer>
    </>
  );
};

export default GardenPage;
