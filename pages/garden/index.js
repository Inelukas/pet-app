import React, { useEffect, useState } from "react";
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const PetDisplay = styled.div`
  font-size: 8em;
  color: var(--text-color);
  transform-origin: center;
  animation: ${({ $animationtype }) =>
    $animationtype === "rotating"
      ? css`
          ${rotate} 1s linear
        `
      : $animationtype === "bouncing"
      ? css`
          ${bounce} 1s ease
        `
      : $animationtype === "growing"
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
  cursor: pointer;
  width: 75px;
`;

const StatusLink = styled(Link)`
  background-color: ${(props) => props.$bgcolor};
  color: var(--text-color);
  border: none;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
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

function Garden({
  petCollection,
  onInteractPet,
  currentPet,
  setCurrentPet,
  onCurrentPet,
}) {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [animationState, setAnimationState] = useState(null);
  if (!petCollection || petCollection.length === 0) {
    return <p>No pets available</p>;
  }

  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setCurrentPet((prevValues) => {
        return {
          ...prevValues,
          status: {
            hunger:
              prevValues.status.hunger < 100
                ? Math.min(prevValues.status.hunger + 5, 100)
                : 100,
            happiness:
              prevValues.status.happiness > 0
                ? Math.max(prevValues.status.happiness - 5, 0)
                : 0,
            energy:
              prevValues.status.energy > 0
                ? Math.max(prevValues.status.energy - 5, 0)
                : 0,
            health:
              prevValues.status.hunger === 100 &&
              prevValues.status.happiness === 0 &&
              prevValues.status.energy === 0
                ? Math.max(prevValues.status.health - 5, 0)
                : prevValues.status.health,
          },
        };
      });
    }, 1000);

    return () => {
      clearInterval(updateIndicatorsTimer);
    };
  }, []);

  useEffect(() => {
    if (currentPet.status.health === 0) currentPet.alive = false;
  }, [currentPet.status.health]);

  function increaseStatus(statusKey) {
    const interactedPets = [...petCollection];
    const currentStatus = interactedPets[currentPetIndex].status[statusKey];
    if (statusKey === "hunger") {
      interactedPets[currentPetIndex].status[statusKey] = Math.max(
        currentStatus - 5,
        0
      );
    } else {
      interactedPets[currentPetIndex].status[statusKey] = Math.min(
        currentStatus + 5,
        100
      );
    }

    onInteractPet(interactedPets[currentPetIndex]);

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

  // const healthValue = Math.round(
  //   (100 -
  //     currentPet.status.hunger +
  //     currentPet.status.happiness +
  //     currentPet.status.energy) /
  //     3
  // );

  return (
    <>
      <GardenContainer>
        <StatusContainer>
          <HorizontalBar>
            <Icon role="img" aria-label="A heart indicating Health">
              ❤️
            </Icon>
            <HorizontalBarFill value={currentPet.status.health} />
          </HorizontalBar>
          <VerticalBarContainer>
            <VerticalBar>
              <Icon
                role="img"
                aria-label="A bowl of ice-cream indicating hunger"
              >
                🍨
              </Icon>
              <VerticalBarFill
                $bgcolor="orange"
                value={currentPet.status.hunger}
              />
            </VerticalBar>
            <VerticalBar>
              <Icon role="img" aria-label="Some confetti indicating happiness">
                🎉
              </Icon>
              <VerticalBarFill
                $bgcolor="pink"
                value={currentPet.status.happiness}
              />
            </VerticalBar>
            <VerticalBar>
              <Icon role="img" aria-label="A battery indicating energy">
                🔋
              </Icon>
              <VerticalBarFill
                $bgcolor="yellow"
                value={currentPet.status.energy}
              />
            </VerticalBar>
          </VerticalBarContainer>
        </StatusContainer>
        <ButtonContainer>
          <StatusButton
            $bgcolor="orange"
            onClick={() => increaseStatus("hunger")}
          >
            Feed
          </StatusButton>

          <StatusLink href="/" $bgcolor="pink">
            🎉
          </StatusLink>

          <StatusButton
            $bgcolor="yellow"
            onClick={() => increaseStatus("energy")}
          >
            Train
          </StatusButton>
        </ButtonContainer>
        <PetWrapper>
          <PetDisplay $animationtype={animationState}>
            {currentPet.alive ? currentPet.picture : "☠"}
          </PetDisplay>
        </PetWrapper>
        <ListPageLink>
          <Link href="/pet-list">List</Link>
          {/* update link to list page once replaced as mainpage required */}
        </ListPageLink>
      </GardenContainer>
      <NavbarContainer>
        <NavButton onClick={() => onCurrentPet("previous")}>Prev Pet</NavButton>

        <Link
          href={{
            pathname: `/pet-details/${currentPet.id}`,
            query: {
              health: currentPet.status.health,
              happiness: currentPet.status.happiness,
              hunger: currentPet.status.hunger,
              energy: currentPet.status.energy,
              intelligence: currentPet.status.intelligence,
            },
          }}
        >
          <StyledLink>{currentPet.picture}</StyledLink>
        </Link>
        <NavButton onClick={() => onCurrentPet("next")}>Next Pet</NavButton>
      </NavbarContainer>
    </>
  );
}

export default Garden;
