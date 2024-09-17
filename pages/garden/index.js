import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import AnimatedPet from "@/components/AnimatedPet/AnimatedPet";
import Image from "next/image";
import { indicatorZoomKeyframes } from "@/lib/data";
import PetSelection from "@/components/PetSelection/PetSelection";

const GardenPage = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const GardenContainer = styled.div`
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

  @media (min-width: 1200px) {
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

const VerticalBar = styled.section`
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
          ${indicatorZoomKeyframes} 1s ease-in-out infinite
        `
      : "none"};
`;

const VerticalBarFill = styled.section`
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
          ${indicatorZoomKeyframes} 1s ease-in-out infinite
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

const Icon = styled.span`
  z-index: 2;
  padding-top: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const HeartIcon = styled.span`
  z-index: 2;
  padding-left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.section`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  text-align: center;
`;

export default function Garden({
  activePet,
  petCollection,
  setPetCollection,
  currentPetID,
  onCurrentPetID,
  onCurrentPet,
  onDeadPet,
  onHealthFactor,
  onEnergyFactor,
  onHappinessFactor,
  onHungerFactor,
  onSpeedFactor,
}) {
  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setPetCollection((prevPets) =>
        prevPets.map((pet) => {
          if (pet.id === currentPetID) {
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
    }, 1000);

    return () => {
      clearInterval(updateIndicatorsTimer);
    };
  }, [currentPetID, activePet]);

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
    <GardenPage>
      <GardenContainer>
        {activePet && (
          <StatusContainer>
            <HorizontalBar
              $critical={
                activePet.status.health <= 25 && activePet.status.health !== 0
              }
            >
              <HeartIcon aria-label="A heart indicating Health">❤️</HeartIcon>
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
        {activePet && (
          <ButtonContainer>
            <StatusLink
              href={activePet.alive ? "/catch-the-food" : ""}
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
          <PetWrapper>
            {activePet.alive ? (
              <AnimatedPet
                pet={activePet.animations}
                dying={activePet.dying}
                movingSpeedFactor={onSpeedFactor(activePet.characteristics)}
                onDeadPet={onDeadPet}
              />
            ) : (
              <Image
                src="/assets/images/tombstone.png"
                alt={activePet.name || "A Tombstone"}
                width={100}
                height={100}
              />
            )}
          </PetWrapper>
        )}

        <PetSelection
          activePet={activePet}
          petCollection={petCollection}
          onCurrentPet={onCurrentPet}
          onCurrentPetID={onCurrentPetID}
        />
      </GardenContainer>
    </GardenPage>
  );
}
