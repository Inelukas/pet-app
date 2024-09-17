import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const buttonStyles = `
  border: none;
  padding: 10px;
  font-size: 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 5px;
  background-color: var(--secondary-color);
  border-radius: 8px;
  min-width: 200px;
  width: 50%;
  max-width: 250px;
  position: absolute;
  bottom: 10px;
`;

const NavButton = styled.button`
  ${buttonStyles}
  background-color: var(--primary-color);
  color: var(--neutral-color);
`;

const DropdownButton = styled.button`
  ${buttonStyles}
  background-color: var(--signal-color);
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  bottom: 85%;
  background-color: var(--neutral-color);
  border: 1px solid var(--text-color);
  list-style: none;
  text-align: center;
  right: 50%;
  transform: translateX(50%);
  opacity: 75%;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color);
  }
`;

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
  box-shadow: 2px 2px #000;
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
  box-shadow: 3px 3px 3px #000;
  cursor: pointer;
  image-rendering: optimizeQuality;
`;

export default function PetSelection({
  activePet,
  petCollection,
  onCurrentPetID,
  onCurrentPet,
  onPreviousPet,
  onNextPet,
  animalList,
  currentImageIndex,
  hideButtons = false,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePetSelect = (petId) => {
    onCurrentPetID(petId);
    setIsDropdownOpen(false);
  };

  function renderNavBar() {
    return (
      <>
        {activePet && (
          <NavbarContainer>
            <NavButton onClick={() => onCurrentPet("previous")}>←</NavButton>
            <DropdownButton
              onClick={() =>
                petCollection.length > 1 && setIsDropdownOpen(!isDropdownOpen)
              }
            >
              <Image
                src={activePet.picture}
                alt={activePet.name || "A cute pet"}
                width={30}
                height={30}
                quality={100}
              />
            </DropdownButton>
            {isDropdownOpen && (
              <DropdownMenu>
                {petCollection.map((pet) => (
                  <DropdownItem
                    key={pet.id}
                    onClick={() => handlePetSelect(pet.id)}
                  >
                    <Image
                      src={pet.picture}
                      alt={pet.name || "A cute pet"}
                      width={20}
                      height={20}
                      quality={100}
                    />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
            <NavButton onClick={() => onCurrentPet("next")}>→</NavButton>
          </NavbarContainer>
        )}
      </>
    );
  }

  function renderPetSelection() {
    return (
      <StyledPetSelection>
        {!hideButtons && (
          <StyledSelectionButton type="button" onClick={onPreviousPet}>
            ←
          </StyledSelectionButton>
        )}
        <StyledPetIcon onClick={!hideButtons ? onNextPet : null}>
          <Image
            src={animalList[currentImageIndex].image}
            alt={animalList[currentImageIndex].name || "A cute pet"}
            width={100}
            height={100}
            quality={100}
          />
        </StyledPetIcon>
        {!hideButtons && (
          <StyledSelectionButton type="button" onClick={onNextPet}>
            →
          </StyledSelectionButton>
        )}
      </StyledPetSelection>
    );
  }

  return !hideButtons ? renderNavBar() : renderPetSelection();
}
