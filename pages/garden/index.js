import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import AnimatedPet from "@/components/AnimatedPet/AnimatedPet";
import Image from "next/image";
import { indicatorZoomKeyframes } from "@/lib/data";
import PetSelection from "@/components/PetSelection/PetSelection";
import energyIcon from "../../public/assets/energy.png";
import heartIcon from "../../public/assets/heart.png";
import hungerIcon from "../../public/assets/hunger.png";
import happinessIcon from "../../public/assets/happiness.png";
import Popup from "@/components/Popup/Popup";

const GardenPage = styled.main`
  display: flex;
  justify-content: center;
  overflow: hidden;
  max-height: -webkit-fill-available;
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
  overflow: hidden;
  max-height: -webkit-fill-available;

  @media (min-width: 650px) {
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
  @media (min-width: 1200px) {
    max-width: 800px;
  }
`;

const PetName = styled.h1`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--secondary-gradient);
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  z-index: 5;
  box-shadow: var(--global-shadow);

  font-size: ${(props) =>
    `calc(${Math.max(1.5 - (props.$nameLength - 6) * 0.1, 0.8)}rem)`};
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
  background: var(--health-gradient);
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
  achievements,
  onUpdateAchievements,
  onTotalTimeSpent,
  totalTimeSpent,
}) {
  const [unlockedAchievement, setUnlockedAchievement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      onTotalTimeSpent((prevTime) =>
        activePet?.isAlive ? prevTime + 1 : prevTime
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [onTotalTimeSpent, activePet?.isAlive]);

  useEffect(() => {
    if (totalTimeSpent >= 60) {
      let achievementUnlocked = false;

      if (!achievements.food[0]) {
        onUpdateAchievements("food", 0);
        setUnlockedAchievement("Broccoli unlocked!");
        setShowPopup(true);
        achievementUnlocked = true;
      }

      if (totalTimeSpent >= 300 && !achievements.play[0]) {
        onUpdateAchievements("play", 0);
        setUnlockedAchievement("Twig unlocked!");
        setShowPopup(true);
        achievementUnlocked = true;
      }

      if (totalTimeSpent >= 600 && !achievements.furniture[0]) {
        onUpdateAchievements("furniture", 0);
        setUnlockedAchievement("Doghouse unlocked!");
        setShowPopup(true);
        achievementUnlocked = true;
      }
    }
  }, [totalTimeSpent, achievements, onUpdateAchievements]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setPetCollection((prevPets) =>
        prevPets.map((pet) => {
          if (pet.id === currentPetID && !pet.isRevived) {
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
                  onHungerFactor(activePet?.characteristics),
                  intelligenceFactor
                ),

                happiness: calculateIndicatorValue(
                  "happiness",
                  happiness,
                  onHappinessFactor(activePet?.characteristics),
                  intelligenceFactor
                ),

                energy: calculateIndicatorValue(
                  "energy",
                  energy,
                  onEnergyFactor(activePet?.characteristics),
                  intelligenceFactor
                ),

                health: calculateIndicatorValue(
                  "health",
                  health,
                  onHealthFactor(activePet?.characteristics),
                  intelligenceFactor,
                  hunger,
                  happiness,
                  energy
                ),
              },
              isDying: pet.status.health === 0 ? true : false,
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
          <PetName $nameLength={activePet?.name.length}>
            {activePet?.name}
          </PetName>
        )}
        {activePet && (
          <StatusContainer>
            <HorizontalBar
              $critical={
                activePet?.status.health <= 25 && activePet?.status.health !== 0
              }
            >
              <HeartIcon src={heartIcon} alt="Heart Icon" width={18} />
              <HorizontalBarFill value={activePet?.status.health} />
            </HorizontalBar>
            <VerticalBarContainer>
              <VerticalBar
                $critical={
                  activePet?.status.hunger >= 75 &&
                  activePet?.status.health !== 0
                }
              >
                <Icon src={hungerIcon} alt="hunger Icon" width={18} />
                <VerticalBarFill
                  $bgcolor="var(--hunger-gradient)"
                  value={activePet?.status.hunger}
                />
              </VerticalBar>
              <VerticalBar
                $critical={
                  activePet?.status.happiness <= 25 &&
                  activePet?.status.health !== 0
                }
              >
                <Icon src={happinessIcon} alt="happiness Icon" width={18} />
                <VerticalBarFill
                  $bgcolor="var(--happiness-gradient)"
                  value={activePet?.status.happiness}
                />
              </VerticalBar>
              <VerticalBar
                $critical={
                  activePet?.status.energy <= 25 &&
                  activePet?.status.health !== 0
                }
              >
                <Icon src={energyIcon} alt="energy Icon" width={18} />
                <VerticalBarFill
                  $bgcolor="var(--energy-gradient)"
                  value={activePet?.status.energy}
                />
              </VerticalBar>
            </VerticalBarContainer>
          </StatusContainer>
        )}
        {activePet && !activePet?.isRevived && (
          <ButtonContainer>
            <StatusLink
              href={
                activePet?.isAlive && !activePet?.isDying
                  ? "/catch-the-food"
                  : ""
              }
              $bgcolor="var(--hunger-gradient)"
              disabled={
                !activePet?.isAlive ||
                activePet?.isDying ||
                activePet?.status.hunger === 0
              }
            >
              <Image src={hungerIcon} alt="hunger Icon" width={30} />
            </StatusLink>
            <StatusLink
              href={activePet?.isAlive && !activePet?.isDying ? "/snake" : ""}
              $bgcolor="var(--happiness-gradient)"
              disabled={!activePet?.isAlive || activePet?.isDying}
            >
              <Image src={happinessIcon} alt="happiness Icon" width={30} />
            </StatusLink>
            <StatusLink
              href={activePet?.isAlive && !activePet?.isDying ? "/tapping" : ""}
              $bgcolor="var(--energy-gradient)"
              disabled={!activePet?.isAlive || activePet?.isDying}
            >
              <Image src={energyIcon} alt="energy Icon" width={30} />
            </StatusLink>
          </ButtonContainer>
        )}

        {activePet && (
          <PetWrapper>
            {activePet?.isAlive || activePet?.isRevived ? (
              <AnimatedPet
                pet={activePet?.animations}
                isDying={activePet?.isDying}
                movingSpeedFactor={onSpeedFactor(activePet?.characteristics)}
                onDeadPet={onDeadPet}
              />
            ) : (
              <Image
                src="/assets/images/tombstone.png"
                alt={activePet?.name || "A Tombstone"}
                width={100}
                height={100}
              />
            )}
          </PetWrapper>
        )}

        <PetSelection
          activePet={activePet}
          petCollection={petCollection}
          onCurrentPetID={onCurrentPetID}
          onCurrentPet={onCurrentPet}
        />
        {showPopup && <Popup message={unlockedAchievement} />}
      </GardenContainer>
    </GardenPage>
  );
}
