import styled from "styled-components";

const StyledPet = styled.div`
  display: flex;
  border: 2px solid #000000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
  }
`;

const StyledPetData = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Pet({ petData }) {
  return (
    <StyledPet>
      <span>{petData.picture}</span>
      <StyledPetData>
        <h2>Name:{petData.name}</h2>
        <h2>Type:{petData.type}</h2>
        <h2>Characteristics:{...petData.characteristics}</h2>
      </StyledPetData>
    </StyledPet>
  );
}
