import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import petsData from "@/Lib/Data";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 35%, 55%, 80%, 100% {
    transform: translateY(0);
  }
  5% {
    transform: translateY(-45px);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const grow = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const GardenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  background-image: url("Background/pet-app-background-dalle.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PetWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const PetDisplay = styled.div`
  font-size: 8em;
  color: var(--text-color);
  transform-origin: center;
  animation: ${({ $rotating, $bouncing, $growing }) =>
    $rotating
      ? css`
          ${rotate} 1s linear
        `
      : $bouncing
      ? css`
          ${bounce} 1s ease infinite
        `
      : $growing
      ? css`
          ${grow} 0.5s ease
        `
      : "none"};
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

const StyledLink = styled.div`
  background-color: var(--primary-color);
  color: var(--text-color);
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

const StatusContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const VerticalBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 10px;
`;

const VerticalBar = styled.div`
  width: 20px;
  height: 100px;
  background-color: var(--neutral-color);
  margin-right: 5px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const VerticalBarFill = styled.div`
  width: 100%;
  background-color: var(--primary-color);
  height: ${({ value }) => value}%;
  position: absolute;
  bottom: 0;
`;

const HorizontalBar = styled.div`
  width: 100px;
  height: 20px;
  background-color: var(--neutral-color);
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
`;

const HorizontalBarFill = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: var(--primary-color);
  position: absolute;
  left: 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StatusButton = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 8px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--signal-color);
  }
`;

const ListPageLink = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--text-color);
  cursor: pointer;
`;

const GardenPage = () => {
  const [pets, setPets] = useState(petsData);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);

  const handlePrevPet = () => {
    setCurrentPetIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : pets.length - 1
    );
  };

  const handleNextPet = () => {
    setCurrentPetIndex((prevIndex) => (prevIndex + 1) % pets.length);
  };

  const increaseStatus = (statusKey) => {
    const updatedPets = [...pets];
    const currentStatus = updatedPets[currentPetIndex].status[statusKey];
    updatedPets[currentPetIndex].status[statusKey] = Math.min(
      currentStatus + 5,
      100
    );
    setPets(updatedPets);

    if (statusKey === "energy") {
      setIsRotating(true);
      setTimeout(() => {
        setIsRotating(false);
      }, 1000);
    }
    if (statusKey === "happiness") {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 1000);
    }
    if (statusKey === "hunger") {
      setIsGrowing(true);
      setTimeout(() => {
        setIsGrowing(false);
      }, 500);
    }
  };

  const currentPet = pets[currentPetIndex];

  const healthValue = Math.round(
    (currentPet.status.hunger +
      currentPet.status.happiness +
      currentPet.status.energy) /
      3
  );

  return (
    <>
      <GardenContainer>
        <StatusContainer>
          <HorizontalBar>
            <HorizontalBarFill value={healthValue} />
          </HorizontalBar>
          <VerticalBarContainer>
            <VerticalBar>
              <VerticalBarFill value={currentPet.status.hunger} />
            </VerticalBar>
            <VerticalBar>
              <VerticalBarFill value={currentPet.status.happiness} />
            </VerticalBar>
            <VerticalBar>
              <VerticalBarFill value={currentPet.status.energy} />
            </VerticalBar>
            <VerticalBar>
              <VerticalBarFill value={currentPet.status.intelligence} />
            </VerticalBar>
          </VerticalBarContainer>
        </StatusContainer>
        <ButtonContainer>
          <StatusButton onClick={() => increaseStatus("hunger")}>
            Increase Hunger
          </StatusButton>
          <StatusButton onClick={() => increaseStatus("happiness")}>
            Increase Happiness
          </StatusButton>
          <StatusButton onClick={() => increaseStatus("energy")}>
            Increase Energy
          </StatusButton>
        </ButtonContainer>
        <PetWrapper>
          <PetDisplay
            $rotating={isRotating}
            $bouncing={isBouncing}
            $growing={isGrowing}
          >
            {currentPet.picture}
          </PetDisplay>
        </PetWrapper>
        <ListPageLink>
          <Link href="/">Home</Link>
          {/*placeholder - link to list page once implemented required */}
        </ListPageLink>
      </GardenContainer>
      <NavbarContainer>
        <NavButton onClick={handlePrevPet}>Prev Pet</NavButton>
        <Link href="/" passHref>
          {/*placeholder - link to detail page once implemented required */}
          <StyledLink>{currentPet.picture}</StyledLink>
        </Link>
        <NavButton onClick={handleNextPet}>Next Pet</NavButton>
      </NavbarContainer>
    </>
  );
};

export default GardenPage;
