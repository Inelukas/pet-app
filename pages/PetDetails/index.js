import styled from "styled-components";

const DetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  max-width: 300px;
  background-color: var(--neutral-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const Header = styled.h1`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const PetPictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .portrait {
    width: 10vh;
    height: 10vh;
    border-radius: 50%;
    background: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5vh;
    margin-bottom: 10px;
  }
`;

const PetName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
  margin: 0;
  padding: 0;
`;

const PetCharContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  width: fit-content;
`;

const PetStatusContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 10px;
  width: 100%;
`;

const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  color: var(--primary-color);

  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .value {
    font-size: 1.2rem;
    color: var(--signal-color);
  }
`;

const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Turtle",
    picture: "🐢",
    characteristics: ["smart", "joyful"],
    status: {
      hunger: 30,
      happiness: 85,
      energy: 30,
      intelligence: 100,
    },
  },
];

export default function PetDetails() {
  return (
    <DetailsContainer>
      <Header>Pet Details</Header>
      {pets.map((pet) => (
        <div key={pet.id}>
          <PetPictureContainer>
            <div className="portrait">
              <span>{pet.picture}</span>
            </div>
            <PetName>{pet.name}</PetName>
          </PetPictureContainer>
          <PetCharContainer>
            Personality: {pet.characteristics.join(", ")}
          </PetCharContainer>
          <PetStatusContainer>
            <StatusBox>
              <div className="label">Hunger</div>
              <div className="value">{pet.status.hunger}</div>
            </StatusBox>
            <StatusBox>
              <div className="label">Happiness</div>
              <div className="value">{pet.status.happiness}</div>
            </StatusBox>
            <StatusBox>
              <div className="label">Energy</div>
              <div className="value">{pet.status.energy}</div>
            </StatusBox>
            <StatusBox>
              <div className="label">Intelligence</div>
              <div className="value">{pet.status.intelligence}</div>
            </StatusBox>
          </PetStatusContainer>
        </div>
      ))}
    </DetailsContainer>
  );
}
