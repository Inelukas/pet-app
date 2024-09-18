import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import AnimatedPet from "@/components/AnimatedPet/AnimatedPet";
import Image from "next/image";
import { indicatorZoomKeyframes } from "@/lib/data";
import PetSelection from "@/components/PetSelection/PetSelection";
import EnergyIcon from "../../public/assets/Energy.png";
import heartIcon from "../../public/assets/heart.png";
import HungerIcon from "../../public/assets/Hunger.png";
import HappinessIcon from "../../public/assets/Happiness.png";

const GardenPage = styled.main`
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

  @media (min-width: 650px) {
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
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
  background: var(--neutral-gradient);
  margin-right: 5px;
  box-shadow: var(--global-shadow);
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  border: 1px solid
    ${({ $critical }) => ($critical ? "red" : "var(--neutral-gradient)")};

  box-sizing: border-box;

  animation: ${({ $critical }) =>
    $critical
      ? css`
          ${indicatorZoomKeyframes} 1s ease-in-out infinite
        `
      : "none"};
`;
const VerticalBarFill = styled.section`
  width: 100%;
  background: ${(props) => props.$bgcolor};
  height: ${({ value }) => value}%;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

const HorizontalBar = styled.section`
  width: 100px;
  height: 20px;
  box-shadow: var(--global-shadow);
  background: var(--neutral-gradient);
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  border: 1px solid
    ${({ $critical }) => ($critical ? "red" : "var(--neutral-gradient)")};
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
  background: var(--Health-gradient);
  position: absolute;
  left: 0;
`;

const Icon = styled(Image)`
  z-index: 2;
  padding-top: 5px;
  height: auto;
  position: absolute;
  display: flex;
  justify-content: center;
`;
const HeartIcon = styled(Image)`
  z-index: 2;
  padding-left: 5px;
  width: auto;
  position: absolute;
  display: flex;
  align-items: center;
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
  background: ${(props) => props.$bgcolor};
  color: var(--text-color);
  border: none;
  padding: 10px;
  box-shadow: var(--global-shadow);
  margin-bottom: 8px;
  border-radius: 4px;
  width: 60px;
  text-decoration: none;
  text-align: center;
  font-size: 1.5rem;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: all 0.2s ease-in-out;

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        background: var(--primary-gradient);
        box-shadow: var(--global-shadow);
        transform: scale(1.1);
      }
      
      &:active {
        background: var(--secondary-gradient);
      }
    `}
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
          if (pet.id === currentPetID && !pet.isRevived) {
            const { Hunger, Happiness, Energy, Health, Intelligence } =
              pet.status;
            const IntelligenceFactor = 1 - (Intelligence / 100) * 0.9;

            return {
              ...pet,
              status: {
                ...pet.status,
                Hunger: calculateIndicatorValue(
                  "Hunger",
                  Hunger,
                  onHungerFactor(activePet.characteristics),
                  IntelligenceFactor
                ),

                Happiness: calculateIndicatorValue(
                  "Happiness",
                  Happiness,
                  onHappinessFactor(activePet.characteristics),
                  IntelligenceFactor
                ),

                Energy: calculateIndicatorValue(
                  "Energy",
                  Energy,
                  onEnergyFactor(activePet.characteristics),
                  IntelligenceFactor
                ),

                Health: calculateIndicatorValue(
                  "Health",
                  Health,
                  onHealthFactor(activePet.characteristics),
                  IntelligenceFactor,
                  Hunger,
                  Happiness,
                  Energy
                ),
              },
              isDying: pet.status.Health === 0 ? true : false,
            };
          }
          return pet;
        })
      );
    }, 10);

    return () => {
      clearInterval(updateIndicatorsTimer);
    };
  }, [currentPetID, activePet]);

  function calculateIndicatorValue(
    indicatorName,
    indicator,
    indicatorFactor,
    IntelligenceFactor,
    Hunger,
    Happiness,
    Energy
  ) {
    const indicatorChangeAmount =
      (5 * Math.round(indicatorFactor * IntelligenceFactor * 10)) / 10;

    if (indicatorName === "Health") {
      const HealthChangeAmount = (5 * Math.round(indicatorFactor * 10)) / 10;
      return Hunger === 100 && Happiness === 0 && Energy === 0
        ? Math.max(indicator - HealthChangeAmount, 0)
        : indicator;
    } else if (indicatorName === "Hunger") {
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
                activePet.status.Health <= 25 && activePet.status.Health !== 0
              }
            >
              <HeartIcon src={heartIcon} alt="Heart Icon" width={18} />
              <HorizontalBarFill value={activePet.status.Health} />
            </HorizontalBar>
            <VerticalBarContainer>
              <VerticalBar
                $critical={
                  activePet.status.Hunger >= 75 && activePet.status.Health !== 0
                }
              >
                <Icon src={HungerIcon} alt="Hunger Icon" width={18} />
                <VerticalBarFill
                  $bgcolor="var(--Hunger-gradient)"
                  value={activePet.status.Hunger}
                />
              </VerticalBar>
              <VerticalBar
                $critical={
                  activePet.status.Happiness <= 25 &&
                  activePet.status.Health !== 0
                }
              >
                <Icon src={HappinessIcon} alt="Happiness Icon" width={18} />
                <VerticalBarFill
                  $bgcolor="var(--Happiness-gradient)"
                  value={activePet.status.Happiness}
                />
              </VerticalBar>
              <VerticalBar
                $critical={
                  activePet.status.Energy <= 25 && activePet.status.Health !== 0
                }
              >
                <Icon src={EnergyIcon} alt="Energy Icon" width={18} />
                <VerticalBarFill
                  $bgcolor="var(--Energy-gradient)"
                  value={activePet.status.Energy}
                />
              </VerticalBar>
            </VerticalBarContainer>
          </StatusContainer>
        )}
        {activePet && !activePet.isRevived && (
          <ButtonContainer>
            <StatusLink
              href={activePet.isAlive ? "/catch-the-food" : ""}
              $bgcolor="var(--Hunger-gradient)"
              disabled={!activePet.isAlive || activePet.status.Hunger === 0}
            >
              <Image src={HungerIcon} alt="Hunger Icon" width={30} />
            </StatusLink>
            <StatusLink
              href={activePet.isAlive ? "/snake" : ""}
              $bgcolor="var(--Happiness-gradient)"
              disabled={!activePet.isAlive}
            >
              <Image src={HappinessIcon} alt="Happiness Icon" width={30} />
            </StatusLink>
            <StatusLink
              href={activePet.isAlive ? "/tapping" : ""}
              $bgcolor="var(--Energy-gradient)"
              disabled={!activePet.isAlive}
            >
              <Image src={EnergyIcon} alt="Energy Icon" width={30} />
            </StatusLink>
          </ButtonContainer>
        )}

        {activePet && (
          <PetWrapper>
            {activePet.isAlive || activePet.isRevived ? (
              <AnimatedPet
                pet={activePet.animations}
                isDying={activePet.isDying}
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
