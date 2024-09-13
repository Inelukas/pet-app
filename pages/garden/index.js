import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import AnimatedPet from "@/components/AnimatedPet/AnimatedPet";
import {
  ListPageWrapper,
  DetailPageWrapper,
} from "@/components/LinkButtons/LinkButtons";
import Image from "next/image";

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

const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const GardenContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 650px;
  height: 100vh;
  background-image: url("/Background/garden.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    max-width: 800px;
  }
`;

const PetWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  font-size: 8em;
  color: var(--text-color);
  transform-origin: center;
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 5px;
  background-color: var(--secondary-color);
  border-radius: 8px;
  width: 50%;
  max-width: 250px;
  position: absolute;
  bottom: 10px;
`;

const NavButton = styled.button`
  background-color: var(--primary-color);
  color: var(--neutral-color);
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

export const AdjustedListPageWrapper = styled(ListPageWrapper)`
  bottom: 10px;
  right: 10px;
  position: absolute;
`;

const AdjustedDetailPageWrapper = styled(DetailPageWrapper)`
  bottom: 10px;
  left: 10px;
  position: absolute;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color);
  }
`;

const StatusContainer = styled.section`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const VerticalBarContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 10px;
`;

export const VerticalBar = styled.section`
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

export const VerticalBarFill = styled.section`
  width: 100%;
  background-color: ${(props) => props.$bgcolor};
  height: ${({ value }) => value}%;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

const HorizontalBar = styled.section`
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

const HorizontalBarFill = styled.section`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: green;
  position: absolute;
  left: 0;
`;

export const Icon = styled.span`
  z-index: 2;
  position: absolute;
`;

const ButtonContainer = styled.section`
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

export default function Garden({
  activePet,
  petCollection,
  setPetCollection,
  onInteractPet,
  currentPet,
  setCurrentPet,
  onCurrentPet,
  onDeadPet,
  onHealthFactor,
  onEnergyFactor,
  onHappinessFactor,
  onHungerFactor,
  onSpeedFactor,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setPetCollection((prevPets) =>
        prevPets.map((pet) => {
          if (pet.id === currentPet && !pet.revived) {
            const { hunger, happiness, energy, health, intelligence } =
              pet.status;
            const intelligenceFactor = 1 - (intelligence / 100) * 0.9;

            return {
              ...pet,
              status: {
                ...pet.status,
                hunger: calculateIndicatorValue(
                  "hunger",
                  hunger,
                  onHungerFactor(activePet.characteristics),
                  intelligenceFactor
                ),

                happiness: calculateIndicatorValue(
                  "happiness",
                  happiness,
                  onHappinessFactor(activePet.characteristics),
                  intelligenceFactor
                ),

                energy: calculateIndicatorValue(
                  "energy",
                  energy,
                  onEnergyFactor(activePet.characteristics),
                  intelligenceFactor
                ),

                health: calculateIndicatorValue(
                  "health",
                  health,
                  onHealthFactor(activePet.characteristics),
                  intelligenceFactor,
                  hunger,
                  happiness,
                  energy
                ),
              },
              dying: pet.status.health === 0 ? true : false,
            };
          }
          return pet;
        })
      );
    }, 10);

    return () => {
      clearInterval(updateIndicatorsTimer);
    };
  }, [currentPet, activePet]);

  function handlePetSelect(petId) {
    setCurrentPet(petId);
    setIsDropdownOpen(false);
  }

  function calculateIndicatorValue(
    indicatorName,
    indicator,
    indicatorFactor,
    intelligenceFactor,
    hunger,
    happiness,
    energy
  ) {
    const indicatorChangeAmount =
      (5 * Math.round(indicatorFactor * intelligenceFactor * 10)) / 10;

    if (indicatorName === "health") {
      const healthChangeAmount = (5 * Math.round(indicatorFactor * 10)) / 10;
      return hunger === 100 && happiness === 0 && energy === 0
        ? Math.max(indicator - healthChangeAmount, 0)
        : indicator;
    } else if (indicatorName === "hunger") {
      return indicator < 100
        ? Math.min(indicator + indicatorChangeAmount, 100)
        : 100;
    } else {
      return indicator > 0 ? Math.max(indicator - indicatorChangeAmount, 0) : 0;
    }
  }

  return (
    <StyledMain>
      <GardenContainer>
        {activePet && (
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
                <Icon aria-label="A bowl of ice-cream indicating hunger">
                  🍨
                </Icon>
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
        )}
        {activePet && !activePet.revived && (
          <ButtonContainer>
            <StatusLink
              href={activePet.alive ? "/game-catch-the-food" : ""}
              $bgcolor="orange"
              disabled={!activePet.alive || activePet.status.hunger === 0}
            >
              <span aria-label="celebration">🍽️</span>
            </StatusLink>

            <StatusLink
              href={activePet.alive ? "/snake" : ""}
              $bgcolor="pink"
              disabled={!activePet.alive}
            >
              <span aria-label="celebration">🎉</span>
            </StatusLink>
            <StatusLink
              href={activePet.alive ? "/tapping" : ""}
              $bgcolor="yellow"
              disabled={!activePet.alive}
            >
              <span aria-label="energy">🔋</span>
            </StatusLink>
          </ButtonContainer>
        )}

        {activePet && (
          <PetWrapper
            $movingSpeedFactor={onSpeedFactor(activePet.characteristics)}
            $alive={activePet.alive}
          >
            {activePet.alive || activePet.revived ? (
              <AnimatedPet
                pet={activePet.animations}
                dying={activePet.dying}
                movingSpeedFactor={onSpeedFactor(activePet.characteristics)}
                onDeadPet={onDeadPet}
                currentPet={currentPet}
              />
            ) : (
              <Image
                src="/assets/images/tombstone.png"
                alt={activePet.name}
                width={30}
                height={30}
                layout="responsive"
                quality={100}
                sizes="(min-width: 600px) 600px, (min-width: 1200px) 1000px, 500px"
              />
            )}
          </PetWrapper>
        )}
        <AdjustedListPageWrapper>
          <Link href="/pet-list" aria-label="Staple of Books indicating List">
            📚
          </Link>
        </AdjustedListPageWrapper>
        {activePet && (
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
        )}
        {activePet && (
          <NavbarContainer>
            <NavButton onClick={() => onCurrentPet("previous")}>←</NavButton>
            <DropdownButton
              onClick={() =>
                setIsDropdownOpen(
                  petCollection.length > 1 ? !isDropdownOpen : isDropdownOpen
                )
              }
            >
              <Image
                src={activePet.picture}
                alt={activePet.name}
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
                      alt={pet.name}
                      width={10}
                      height={10}
                      quality={100}
                    />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
            <NavButton onClick={() => onCurrentPet("next")}>→</NavButton>
          </NavbarContainer>
        )}
      </GardenContainer>
    </StyledMain>
  );
}
