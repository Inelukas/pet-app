import React, { act, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import AnimatedPet from "@/components/AnimatedPet/AnimatedPet";
import {
  ListPageWrapper,
  DetailPageWrapper,
} from "@/components/LinkButtons/LinkButtons";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const zoom = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
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
  background-image: url("/Background/pet-app-background-dalle.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PetWrapper = styled.div`
  position: absolute;
  left: 45%;
  bottom: 0px;
  transform: translate(-50%, -50%);
`;

const PetDisplay = styled.div`
  font-size: 8em;
  color: var(--text-color);
  transform-origin: center;
  animation: ${({ $animationtype, $alive, $movingSpeedFactor }) =>
    $alive && $animationtype === "rotating"
      ? css`
          ${rotate} ${1 * $movingSpeedFactor}s linear
        `
      : $alive && $animationtype === "bouncing"
      ? css`
          ${bounce} ${1 * $movingSpeedFactor}s ease
        `
      : $alive && $animationtype === "growing"
      ? css`
          ${grow} ${0.5 * $movingSpeedFactor}s ease
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
`;

const DropdownButton = styled.button`
  background-color: var(--signal-color);
  border: none;
  padding: 10px;
  font-size: 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  bottom: 10%;
  width: 30px;
  background-color: var(--neutral-color);
  border: 1px solid var(--text-color);
  list-style: none;
  text-align: center;
  overflow: visible;
  right: calc(50%);
  transform: translate(50%);
  opacity: 75%;
  li {
    padding: 8px;
    padding-left: 4px;
    cursor: pointer;
    &:hover {
      background-color: var(--primary-color);
    }
  }
`;

const AdjustedListPageWrapper = styled(ListPageWrapper)`
  bottom: 10%;
  right: calc(50% - 45vw);
`;

const AdjustedDetailPageWrapper = styled(DetailPageWrapper)`
  bottom: 10%;
  left: calc(50% - 45vw);
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color);
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
  border: ${({ $critical }) => ($critical ? "2px solid red" : "none")};
  animation: ${({ $critical }) =>
    $critical
      ? css`
          ${zoom} 1s ease-in-out infinite
        `
      : "none"};
`;

const VerticalBarFill = styled.div`
  width: 100%;
  background-color: ${(props) => props.$bgcolor};
  height: ${({ value }) => value}%;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

const HorizontalBar = styled.div`
  width: 100px;
  height: 20px;
  background-color: var(--neutral-color);
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  border: ${({ $critical }) => ($critical ? "2px solid red" : "none")};
  animation: ${({ $critical }) =>
    $critical
      ? css`
          ${zoom} 1s ease-in-out infinite
        `
      : "none"};
`;

const HorizontalBarFill = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: green;
  position: absolute;
  left: 0;
`;

const Icon = styled.span`
  z-index: 2;
  position: absolute;
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
  background-color: ${(props) => props.$bgcolor};
  color: var(--text-color);
  border: none;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  width: 75px;
`;

const StatusLink = styled(Link)`
  background-color: ${(props) => props.$bgcolor};
  color: var(--text-color);
  border: none;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  width: 75px;
  text-decoration: none;
`;

const ListPageLink = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background-color: var(--signal-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--text-color);
`;

export default function Garden({
  activePet,
  petCollection,
  setPetCollection,
  onInteractPet,
  currentPet,
  setCurrentPet,
  onCurrentPet,
  characteristicEffects,
}) {
  const [animationState, setAnimationState] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setPetCollection((prevPets) =>
        prevPets.map((pet) => {
          if (pet.id === currentPet) {
            const { hunger, happiness, energy, health, intelligence } =
              pet.status;
            const intelligenceFactor = 1 - (intelligence / 100) * 0.9;

            return {
              ...pet,
              status: {
                ...pet.status,
                hunger:
                  hunger < 100
                    ? Math.min(
                        hunger +
                          5 *
                            characteristicEffects.hungerFactor *
                            intelligenceFactor,
                        100
                      )
                    : 100,
                happiness:
                  happiness > 0
                    ? Math.max(
                        happiness -
                          5 *
                            characteristicEffects.happinessFactor *
                            intelligenceFactor,
                        0
                      )
                    : 0,
                energy:
                  energy > 0 ? Math.max(energy - 5 * intelligenceFactor, 0) : 0,
                health:
                  hunger === 100 && happiness === 0 && energy === 0
                    ? Math.max(
                        health - 5 * characteristicEffects.healthFactor,
                        0
                      )
                    : health,
                intelligence: pet.status.intelligence,
              },
              dying: pet.status.health === 0 ? true : false,
            };
          }
          return pet;
        })
      );
    }, 500);

    return () => {
      clearInterval(updateIndicatorsTimer);
    };
  }, [currentPet]);

  function increaseStatus(statusKey) {
    const currentStatus = activePet.status[statusKey];
    if (statusKey === "hunger") {
      activePet.status[statusKey] = Math.max(currentStatus - 5, 0);
    } else {
      activePet.status[statusKey] = Math.min(currentStatus + 5, 100);
    }

    onInteractPet(activePet);

    if (statusKey === "energy") {
      setAnimationState("rotating");
      setTimeout(() => {
        setAnimationState(null);
      }, 1000);
    }
    if (statusKey === "happiness") {
      setAnimationState("bouncing");
      setTimeout(() => {
        setAnimationState(null);
      }, 1000);
    }
    if (statusKey === "hunger") {
      setAnimationState("growing");
      setTimeout(() => {
        setAnimationState(null);
      }, 10000);
    }
  }

  function handlePetSelect(petId) {
    setCurrentPet(petId);
    setIsDropdownOpen(false);
  }

  if (!activePet) {
    return <p>No pets available</p>;
  }

  return (
    <>
      <GardenContainer>
        <StatusContainer>
          <HorizontalBar
            $critical={
              activePet.status.health <= 25 && activePet.status.health !== 0
            }
          >
            <Icon aria-label="A heart indicating Health">❤️</Icon>
            <HorizontalBarFill value={activePet.status.health} />
          </HorizontalBar>
          <VerticalBarContainer>
            <VerticalBar
              $critical={
                activePet.status.hunger >= 75 && activePet.status.health !== 0
              }
            >
              <Icon aria-label="A bowl of ice-cream indicating hunger">🍨</Icon>
              <VerticalBarFill
                $bgcolor="orange"
                value={activePet.status.hunger}
              />
            </VerticalBar>
            <VerticalBar
              $critical={
                activePet.status.happiness <= 25 &&
                activePet.status.health !== 0
              }
            >
              <Icon aria-label="Some confetti indicating happiness">🎉</Icon>
              <VerticalBarFill
                $bgcolor="pink"
                value={activePet.status.happiness}
              />
            </VerticalBar>
            <VerticalBar
              $critical={
                activePet.status.energy <= 25 && activePet.status.health !== 0
              }
            >
              <Icon aria-label="A battery indicating energy">🔋</Icon>
              <VerticalBarFill
                $bgcolor="yellow"
                value={activePet.status.energy}
              />
            </VerticalBar>
          </VerticalBarContainer>
        </StatusContainer>
        <ButtonContainer>
          <StatusButton
            $bgcolor="orange"
            onClick={() => increaseStatus("hunger")}
            disabled={!activePet.alive}
          >
            Feed
          </StatusButton>

          <StatusLink
            href={activePet.alive ? "/snake" : ""}
            $bgcolor="pink"
            disabled={!activePet.alive}
          >
            <span aria-label="celebration">🎉</span>
          </StatusLink>

          <StatusButton
            $bgcolor="yellow"
            onClick={() => increaseStatus("energy")}
            disabled={!activePet.alive}
          >
            Train
          </StatusButton>
        </ButtonContainer>
        <PetWrapper>
          <PetDisplay
            $movingSpeedFactor={characteristicEffects.speedFactor}
            $alive={activePet.alive}
            $animationtype={animationState}
          >
            {activePet.alive ? (
              <AnimatedPet
                pet={activePet.animations}
                dying={activePet.dying}
                movingSpeedFactor={characteristicEffects.speedFactor}
                setPetCollection={setPetCollection}
                currentPet={currentPet}
              />
            ) : (
              "☠"
            )}
          </PetDisplay>
        </PetWrapper>
        <AdjustedListPageWrapper>
          <Link href="/pet-list" aria-label="Staple of Books indicating List">
            📚
          </Link>
        </AdjustedListPageWrapper>
        <AdjustedDetailPageWrapper>
          <Link
            href={{
              pathname: `/pet-details/${activePet.id}`,
            }}
            aria-label="Magnifying Glass indicating Details"
          >
            🔎
          </Link>
        </AdjustedDetailPageWrapper>
      </GardenContainer>
      <NavbarContainer>
        <NavButton onClick={() => onCurrentPet("previous")}>Prev Pet</NavButton>
        <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {activePet.picture}
        </DropdownButton>
        {isDropdownOpen && (
          <DropdownMenu>
            {petCollection.map((pet) => (
              <DropdownItem
                key={pet.id}
                onClick={() => handlePetSelect(pet.id)}
              >
                {pet.picture}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
        <NavButton onClick={() => onCurrentPet("next")}>Next Pet</NavButton>
      </NavbarContainer>
    </>
  );
}
