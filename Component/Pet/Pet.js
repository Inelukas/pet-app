import styled from "styled-components";

const StyledPet = styled.div`
  display: flex;
  border: 5px solid #000000;
  border-radius: 10px;
  margin: 2% 0%;
  padding: 10px 3%;
  align-items: center;
  background-color: var(--secondary-color);
  width: 50vw;
  height: 20vh;
  min-height: 150px;
  gap: 3%;

  @media screen and (max-width: 1000px) {
    width: 70vw;
  }

  span {
    font-size: 12vh;
    position: absolute;
    left: 20px;

    @media screen and (max-width: 1000px) {
      font-size: 10vh;
    }
  }
  .portrait {
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

    @media screen and (max-width: 1000px) {
      width: 15vh;
      height: 15vh;
    }
  }
`;

const StyledPetData = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5%;

  @media screen and (max-width: 1000px) {
    margin-right: 0%;
  }

  h2 {
    font-size: 1.2rem;
    margin: 5px 0;
    line-height: 1.2;

    @media screen and (max-width: 700px) {
      font-size: 1rem;
    }
  }
`;

export default function Pet({ petData }) {
  return (
    <StyledPet>
      <div className="portrait">
        <span>{petData.picture}</span>
      </div>
      <StyledPetData>
        <h2>Name: {petData.name}</h2>
        <h2>Type: {petData.type}</h2>
        <h2>
          Characteristics:{" "}
          {petData.characteristics.map((characteristic, index) =>
            index < petData.characteristics.length - 1
              ? characteristic + ", "
              : characteristic
          )}
        </h2>
      </StyledPetData>
    </StyledPet>
  );
}
