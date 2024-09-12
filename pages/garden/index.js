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

const NavbarContainer = styled.div`
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

const AdjustedListPageWrapper = styled(ListPageWrapper)`
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

export default function Garden({
  activePet,
  petCollection,
  setPetCollection,
  onInteractPet,
  currentPet,
  setCurrentPet,
  onCurrentPet,
  onDeadPet,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateIndicatorsTimer = setInterval(() => {
      setPetCollection((prevPets) =>
        prevPets.map((pet) => {
          if (pet.id === currentPet) {
            const { hunger, happiness, energy, health } = pet.status;

            return {
              ...pet,
              status: {
                ...pet.status,
                hunger:
                  hunger < 100
                    ? Math.min(
                        hunger + 5 * getHungerFactor(activePet.characteristics),
                        100
                      )
                    : 100,
                happiness:
                  happiness > 0
                    ? Math.max(
                        happiness -
                          5 * getHappinessFactor(activePet.characteristics),
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
              dying: pet.status.health === 0 ? true : false,
            };
          }
          return pet;
        })
      );
    }, 2000);

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

  function handlePetSelect(petId) {
    setCurrentPet(petId);
    setIsDropdownOpen(false);
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
        {activePet && (
          <ButtonContainer>
            <StatusLink
              href={activePet.alive ? "/game-catch-the-food" : ""}
              $bgcolor="orange"
              onClick={() => increaseStatus("hunger")}
              disabled={!activePet.alive || activePet.status.hunger === 0}
            >
              <span role="img" aria-label="feed">
                🍽️
              </span>
            </StatusLink>

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
        )}
        {activePet && (
          <PetWrapper
            $movingSpeedFactor={getSpeedFactor(activePet.characteristics)}
            $alive={activePet.alive}
          >
            {activePet.alive ? (
              <AnimatedPet
                pet={activePet.animations}
                dying={activePet.dying}
                movingSpeedFactor={getSpeedFactor(activePet.characteristics)}
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
            <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image
                src={activePet.picture}
                alt={activePet.name}
                width={30}
                height={30}
                layout="responsive"
                quality={100}
                // sizes="(min-width: 600px) 600px, (min-width: 1200px) 1000px, 500px"
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
                      layout="responsive"
                      quality={100}
                      //sizes="(min-width: 600px) 600px, (min-width: 1200px) 1000px, 500px"
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
