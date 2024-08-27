import styled from "styled-components";
import Indicator from "../Indicator/Indicator";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 80vw;

  .confirm {
    width: 25vw;
    height: 10vh;
    max-width: 200px;
    font-size: 20px;
  }
`;

const StyledConfirmButton = styled.div`
  width: 25vw;
  height: 10vh;
  max-width: 200px;
  font-size: 20px;
`;

const StyledIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
  max-width: 600px;
  height: 30%;
  min-height: 200px;
  border: 2px solid black;
  background: var(--secondary-color);
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;
`;

const StyledMainField = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 800px;
  height: 30vh;
  min-height: 250px;
  border: 3px solid black;
  padding: 10px;
  background: var(--secondary-color);
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;
  font-size: 18px;
  font-weight: 800;

  .characteristics {
    display: flex;
    gap: 10px;

    select {
      width: 20vw;
      max-width: 240px;
    }
  }
`;

const StyledFormElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;

  label,
  input {
    border: 2px solid black;
    padding: 5px;
    width: 70%;
    border-radius: 10px;
  }

  label {
    width: 20%;
    border: none;
  }
`;

const data = [
  { name: "Happiness", color: "pink" },
  { name: "Energy", color: "yellow" },
  { name: "Intelligence", color: "lightblue" },
];

export default function Form({ animalList, currentPet }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledMainField>
        <StyledFormElement>
          <label>Type:</label>
          <input name="type" value={animalList[currentPet].type} disabled />
        </StyledFormElement>
        <StyledFormElement>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            placeholder="Samantha"
            maxLength={30}
            required
          />
        </StyledFormElement>
        <StyledFormElement>
          <label htmlFor="characteristic">Characteristics:</label>
          <div className="characteristics">
            1:{" "}
            <select name="characteristic" id="characteristic" required>
              <option disabled hidden>
                Choose Nr.1
              </option>
              <option>smart</option>
              <option>stupid</option>
              <option>hyperactive</option>
              <option>lazy</option>
              <option>gluttonous</option>
              <option>picky</option>
              <option>cheerful</option>
              <option>depressed</option>
            </select>
            2:{" "}
            <select name="type-2" required>
              <option value="">Choose Nr.2</option>
              <option>smart</option>
              <option>stupid</option>
              <option>hyperactive</option>
              <option>lazy</option>
              <option>gluttonous</option>
              <option>picky</option>
              <option>cheerful</option>
              <option>depressed</option>
            </select>
          </div>
        </StyledFormElement>
      </StyledMainField>
      <StyledIndicatorContainer>
        {data.map((indicator, index) => (
          <Indicator key={index} data={indicator} />
        ))}
      </StyledIndicatorContainer>
      <div>
        <StyledConfirmButton type="button">Cancel</StyledConfirmButton>
        <StyledConfirmButton type="submit">Create</StyledConfirmButton>
      </div>
    </StyledForm>
  );
}
