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
  background: var(--primary-gradient);
  border-radius: 8px;
  width: 50%;
  max-width: 250px;
  position: absolute;
  bottom: 10px;
  box-shadow: var(--global-shadow);
`;

const NavButton = styled.button`
  ${buttonStyles}
  background: var(--secondary-gradient);
  color: var(--neutral-gradient);
  box-shadow: var(--global-shadow);
`;

const DropdownButton = styled.button`
  ${buttonStyles}
  background: var(--signal-gradient);
  position: relative;
  box-shadow: var(--global-shadow);
`;

const DropdownMenu = styled.ul`
  position: absolute;
  bottom: 85%;
  background: var(--neutral-gradient);
  box-shadow: var(--global-shadow);
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
  width: ${({ size }) => (size === "small" ? "2.5rem" : "4rem")};
  height: ${({ size }) => (size === "small" ? "30px" : "40px")};
  max-width: 100px;
  border-radius: 10px;
  border: none;
  margin: 0 20px;
  box-shadow: var(--global-shadow);
  cursor: pointer;
  background: var(--signal-gradient);

  font-size: ${({ size }) => (size === "small" ? "1.2rem" : "2rem")};
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    background: var(--secondary-gradient);
  }
`;

const StyledPetIcon = styled.div`
  width: ${({ size }) => (size === "small" ? "80px" : "120px")};
  height: ${({ size }) => (size === "small" ? "80px" : "120px")};
  display: grid;
  place-content: center;
  border-radius: 20px;
  background: var(--signal-gradient);
  font-size: ${({ size }) => (size === "small" ? "60px" : "80px")};
  box-shadow: var(--global-shadow);
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
  size = "normal",
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePetSelect = (petId) => {
    onCurrentPetID(petId);
    setIsDropdownOpen(false);
  };

  function renderNavBar() {
    return (
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
    );
  }

  function renderPetSelection() {
    return (
      <StyledPetSelection size={size}>
        {!hideButtons && (
          <StyledSelectionButton
            type="button"
            onClick={onPreviousPet}
            size={size}
          >
            ←
          </StyledSelectionButton>
        )}
        <StyledPetIcon onClick={!hideButtons ? onNextPet : null} size={size}>
          <Image
            src={animalList[currentImageIndex].image}
            alt={animalList[currentImageIndex].name || "A cute pet"}
            width={size === "small" ? 60 : 100} //
            height={size === "small" ? 60 : 100}
            quality={100}
          />
        </StyledPetIcon>
        {!hideButtons && (
          <StyledSelectionButton type="button" onClick={onNextPet} size={size}>
            →
          </StyledSelectionButton>
        )}
      </StyledPetSelection>
    );
  }

  return activePet ? renderNavBar() : renderPetSelection();
}
