import Image from "next/image";
import styled from "styled-components";

export const StyledPet = styled.li`
  display: flex;
  border: 5px solid #000000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  align-items: center;
  background-color: ${({ onGraveyard }) =>
    onGraveyard ? "gray" : "var(--secondary-color)"};
  width: 80vw;
  max-width: 600px;
  height: 20vh;
  min-height: 150px;
  gap: 10%;

  @media screen and (min-width: 600px) {
    margin-right: 10%;
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

<<<<<<< HEAD
const StyledSpan = styled.span`
  font-size: 8vh;
  position: absolute;
  left: 20px;

  @media screen and (min-width: 600px) {
    font-size: 10vh;
  }

  @media screen and (min-width: 900px) {
    font-size: 12vh;
  }
`;

=======
>>>>>>> main
const StyledPortrait = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--signal-color);
  position: relative;
  width: 90px;
  height: 90px;
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

const ReviveButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 5px;

  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
  &:hover {
    background-color: var(--signal-color);
  }
`;

export default function Pet({ petData, onGraveyard }) {
  return (
    <StyledPet onGraveyard={!!onGraveyard}>
      <StyledPortrait>
        {petData.alive ? (
          <Image
            src={petData.image}
            alt={petData.name}
            objectFit="cover"
            width={50}
            height={50}
            quality={100}
          />
        ) : (
          <Image
            src="/assets/images/tombstone.png"
            alt="Tombstone"
            objectFit="cover"
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

        {!petData.alive && onGraveyard && (
          <>
            <p>
              <span>Time of Death: </span>
              {new Date(petData.timeOfDeath).toLocaleString()}
            </p>
            <ReviveButton onClick={() => onGraveyard(petData.id)}>
              Revive Pet
            </ReviveButton>
          </>
        )}

        {petData.revived && (
          <>
            <p>
              <span>Status:</span> Revived
            </p>
          </>
        )}
      </StyledPetData>
    </StyledPet>
  );
}
