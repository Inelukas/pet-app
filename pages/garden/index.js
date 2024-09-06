import React, { act, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";

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

const walk = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(300px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(-300px);
  }
  100% {
    transform: translateX(0);
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
  left: 50%;
  top: 65%;
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
      : $alive
      ? css`
          ${walk} ${8 * $movingSpeedFactor}s infinite
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

const StyledLink = styled.div`
  background-color: var(--signal-color);
  color: var(--text-color);
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px;
  border-radius: 4px;
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
  setPetCollection,
  onInteractPet,
  currentPet,
  onCurrentPet,
}) {
  const [animationState, setAnimationState] = useState(null);
  const [characteristicEffects, setCharacteristicEffects] = useState(() => {
    const speedFactor = getSpeedFactor(activePet.characteristics);
    const happinessFactor = getHappinessFactor(activePet.characteristics);
    const hungerFactor = getHungerFactor(activePet.characteristics);

    return {
      speedFactor: speedFactor,
      happinessFactor: happinessFactor,
      hungerFactor: hungerFactor,
    };
  });

  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setPetCollection((prevPets) =>
        prevPets.map((pet) => {
          if (pet.id === currentPet) {
            const { hunger, happiness, energy, health } = pet.status;

            return {
              ...pet,
              status: {
                hunger:
                  hunger < 100
                    ? Math.min(
                        hunger + 5 * characteristicEffects.hungerFactor,
                        100
                      )
                    : 100,
                happiness:
                  happiness > 0
                    ? Math.max(
                        happiness - 5 * characteristicEffects.happinessFactor,
                        0
                      )
                    : 0,
                energy: energy > 0 ? Math.max(energy - 5, 0) : 0,
                health:
                  hunger === 100 && happiness === 0 && energy === 0
                    ? Math.max(health - 5, 0)
                    : health,
                intelligence: pet.status.intelligence,
              },
              alive: pet.status.health === 0 ? false : true,
            };
          }
          return pet;
        })
      );
    }, 1000);

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
      }, 500);
    }
  }

  function getHappinessFactor(characteristics) {
    const moodFactor = characteristics.includes("cheerful")
      ? 0.5
      : characteristics.includes("melancholy")
      ? 1.5
      : 1;
    const intelligenceFactor = characteristics.includes("foolish")
      ? 0.5
      : characteristics.includes("smart")
      ? 1.5
      : 1;
    return moodFactor * intelligenceFactor;
  }

  function getHungerFactor(characteristics) {
    const hungerFactor = characteristics.includes("gluttonous")
      ? 1.5
      : characteristics.includes("temperate")
      ? 0.5
      : 1;
    return hungerFactor;
  }

  function getSpeedFactor(characteristics) {
    const speedFactor = characteristics.includes("hyperactive")
      ? 0.4
      : characteristics.includes("lethargic")
      ? 2
      : 1;
    return speedFactor;
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
            <Icon role="img" aria-label="A heart indicating Health">
              ❤️
            </Icon>
            <HorizontalBarFill value={activePet.status.health} />
          </HorizontalBar>
          <VerticalBarContainer>
            <VerticalBar
              $critical={
                activePet.status.hunger >= 75 && activePet.status.health !== 0
              }
            >
              <Icon
                role="img"
                aria-label="A bowl of ice-cream indicating hunger"
              >
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
              <Icon role="img" aria-label="Some confetti indicating happiness">
                🎉
              </Icon>
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
              <Icon role="img" aria-label="A battery indicating energy">
                🔋
              </Icon>
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
            <span role="img" aria-label="celebration">
              🎉
            </span>
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
            {activePet.alive ? activePet.picture : "☠"}
          </PetDisplay>
        </PetWrapper>
        <ListPageLink>
          <Link href="/pet-list">List</Link>
        </ListPageLink>
      </GardenContainer>
      <NavbarContainer>
        <NavButton onClick={() => onCurrentPet("previous")}>Prev Pet</NavButton>
        <Link href={`/pet-details/${currentPet}`}>
          <StyledLink>{activePet.picture}</StyledLink>
        </Link>
        <NavButton onClick={() => onCurrentPet("next")}>Next Pet</NavButton>
      </NavbarContainer>
    </>
  );
}
