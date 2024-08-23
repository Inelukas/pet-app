import styled from "styled-components";

const StyledPet = styled.div`
  display: flex;
  border: 2px solid #000000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  max-width: 250;
  background-color: var(--secondary-color);
  span {
    font-size: 20vw;
    position: absolute;
  }
  .portrait {
    width: 45vw;
    height: 30vh;
    border-radius: 100%;
    background: hotpink;
    position: relative;
  }
`;

const StyledPetData = styled.div`
  display: flex;
  flex-direction: column;
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
        <h2>Characteristics: {...petData.characteristics}</h2>
      </StyledPetData>
    </StyledPet>
  );
}
