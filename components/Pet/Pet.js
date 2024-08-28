import styled from "styled-components";

const StyledPet = styled.li`
  display: flex;
  border: 5px solid #000000;
  border-radius: 10px;
  margin: 2%;
  padding: 10px 3%;
  align-items: center;
  background-color: var(--secondary-color);
  width: 50vw;
  max-width: 600px;
  height: 20vh;
  min-height: 150px;
  gap: 5%;

  @media screen and (max-width: 1024px) {
    width: 70vw;
  }

  @media screen and (max-width: 667px) {
    width: 80%;
  }
`;

const StyledPetData = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 5%;
  font-size: 18px;
  margin: 5px;
  line-height: 1.5;

  span {
    font-weight: bold;
  }

  @media screen and (max-width: 1024px) {
    margin-right: 10%;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }

  @media screen and (max-width: 667px) {
    font-size: 16px;
  }
`;

const StyledSpan = styled.span`
  font-size: 12vh;
  position: absolute;
  left: 20px;

  @media screen and (max-width: 1024px) {
    font-size: 10vh;
  }

  @media screen and (max-width: 667px) {
    font-size: 8vh;
  }
`;

const StyledPortrait = styled.section`
  width: 18vh;
  max-width: 150px;
  min-width: 80px;
  height: 18vh;
  max-height: 150px;
  min-height: 80px;
  margin-right: auto;
  border-radius: 100%;
  background: var(--signal-color);
  position: relative;

  @media screen and (max-width: 1024px) {
    width: 15vh;
    height: 15vh;
  }

  @media screen and (max-width: 667px) {
    width: 12vh;
    height: 12vh;
  }
`;

const StyledList = styled.ul`
  display: flex;
  gap: 5px;
  list-style-type: none;

  li {
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }

    @media screen and (max-width: 667px) {
      font-size: 12px;
    }
  }
`;

export default function Pet({ petData }) {
  return (
    <StyledPet>
      <StyledPortrait>
        <StyledSpan>{petData.picture}</StyledSpan>
      </StyledPortrait>
      <StyledPetData>
        <p>
          <span>Name:</span> {petData.name}
        </p>
        <p>
          <span>Type:</span> {petData.type}
        </p>
        <StyledList>
          <p>
            <span>Characteristics:</span>
          </p>
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
