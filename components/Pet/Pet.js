import Image from "next/image";
import styled from "styled-components";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import reviveIcon from "../../public/assets/revive.png";

export const StyledPet = styled.li`
  display: flex;
  box-shadow: var(--global-shadow);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  align-items: center;
  background: ${({ $onGraveyard, $currentPet }) =>
    $currentPet
      ? "var(--signal-gradient)"
      : $onGraveyard
      ? "var(--graveyard-gradient)"
      : "var(--secondary-gradient)"};
  width: 80vw;
  max-width: 600px;
  height: 20vh;
  min-height: 150px;
  gap: 10%;
  position: relative;

  @media screen and (min-width: 600px) {
    gap: 15%;
  }
`;

const StyledPetData = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.8;

  span {
    font-weight: bold;
  }

  @media screen and (min-width: 600px) {
    font-size: 1.2rem;
  }
`;

const StyledPortrait = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: var(--global-shadow);
  border-radius: 50%;
  background: ${({ $currentPet }) =>
    $currentPet ? "var(--secondary-gradient)" : "var(--signal-gradient)"};
  position: relative;
  width: 90px;
  height: 90px;
  min-width: 90px;
  min-height: 90px;
  padding: 10px;
  margin-left: 10px;

  @media (min-width: 600px) {
    max-width: 150px;
    max-height: 150px;
    margin-left: 15px;
  }

  @media (min-width: 900px) {
    max-width: 175px;
    max-height: 175px;
    margin-left: 30px;
  }

  @media (min-width: 1200px) {
    max-width: 200px;
    max-height: 200px;
    margin-left: 50px;
  }
`;

export const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const ReviveButton = styled(ConfirmButton)`
  align-self: flex-end;
  position: absolute;
  background: var(--signal-gradient);
  width: 40px;
  height: 40px;

  margin-bottom: 5px;
  bottom: -15px;
  right: -10px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--secondary-gradient);
    box-shadow: var(--global-shadow);
    transform: scale(1.1);
  }
  &:active {
    background: var(--secondary-gradient);
  }
`;

export default function Pet({ petData, onGraveyard, currentPetID }) {
  const isCurrentPet = petData.id === currentPetID;

  return (
    <StyledPet $onGraveyard={!!onGraveyard} $currentPet={isCurrentPet}>
      <StyledPortrait $currentPet={isCurrentPet}>
        {petData.isAlive ? (
          <Image
            src={petData.image}
            alt={petData.name || "A cute pet"}
            width={50}
            height={50}
            quality={100}
          />
        ) : petData.isRevived ? (
          <Image
            src="/assets/images/ghost.png"
            alt="Ghost"
            width={75}
            height={75}
            quality={100}
          />
        ) : (
          <Image
            src="/assets/images/tombstone.png"
            alt="Tombstone"
            width={75}
            height={75}
            quality={100}
          />
        )}
      </StyledPortrait>
      <StyledPetData>
        <p>
          <span>Name:</span> {petData.name}
        </p>
        <p>
          <span>Type:</span> {petData.type}
        </p>

        {!onGraveyard && (
          <StyledList>
            <span>Characteristics:</span>
            {petData.characteristics.map((characteristic, index) =>
              index < petData.characteristics.length - 1 ? (
                <li key={index}>{characteristic + ", "}</li>
              ) : (
                <li key={index}>{characteristic}</li>
              )
            )}
          </StyledList>
        )}

        {!petData.isAlive && onGraveyard && (
          <>
            <p>
              <span>Time of Death: </span>
              {new Date(petData.timeOfDeath).toLocaleString()}
            </p>
            <ReviveButton onClick={() => onGraveyard(petData.id)}>
              <Image src={reviveIcon} alt="Confirm Icon" width={30} />
            </ReviveButton>
          </>
        )}

        {petData.isRevived && (
          <p>
            <span>Status:</span> Revived
          </p>
        )}
      </StyledPetData>
    </StyledPet>
  );
}
