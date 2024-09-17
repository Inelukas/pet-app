import Image from "next/image";
import styled from "styled-components";

const StyledPet = styled.li`
  display: flex;
  border: 5px solid #000000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  align-items: center;
  background-color: var(--secondary-color);
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

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default function Pet({ petData }) {
  return (
    <StyledPet>
      <StyledPortrait>
        {petData.alive ? (
          <Image
            src={petData.image}
            alt={petData.name || "A cute pet"}
            width={50}
            height={50}
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
      </StyledPetData>
    </StyledPet>
  );
}
