import styled from "styled-components";

export const StyledPet = styled.li`
  display: flex;
  border: 5px solid #000000;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px 20px;
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

const StyledPortrait = styled.section`
  width: 12vh;
  max-width: 150px;
  min-width: 80px;
  height: 12vh;
  max-height: 150px;
  min-height: 80px;
  margin-right: auto;
  border-radius: 100%;
  background: var(--signal-color);
  position: relative;

  @media screen and (min-width: 600px) {
    width: 15vh;
    height: 15vh;
  }

  @media screen and (min-width: 900px) {
    width: 18vh;
    height: 18vh;
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
        <StyledSpan>{petData.alive ? petData.picture : "☠"}</StyledSpan>
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
            </p>
            <ReviveButton onClick={() => onGraveyard(petData.id)}>
              Revive Pet
            </ReviveButton>
          </>
        )}
      </StyledPetData>
    </StyledPet>
  );
}
