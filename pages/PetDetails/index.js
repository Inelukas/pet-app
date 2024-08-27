import styled from "styled-components";

const DetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: var(--neutral-color);
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.header`
  font-size: 15px;
  font-weight: bold;
  color: var(--text-color);
  margin: 10px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1.5px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const PetPictureContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const PetPicture = styled.section`
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5vh;
  margin-bottom: 10px;
`;

const PetName = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
  margin: 5px;
  padding: 5px;
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const PetCharContainer = styled.section`
  display: flex;
  justify-content: center;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const PetStatusContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StatusBar = styled.aside`
  display: flex;
  flex-direction: row;
  width: 40vh;
  height: 10vh;
  margin: 20px;
  padding: 10px;
  align-items: center;
  font-size: 15px;
  color: var(--text-color);
  background-color: var(--signal-color);
`;

const Label = styled(StatusBar)`
  font-weight: bold;
`;

const Value = styled(StatusBar)`
  color: var(--signal-color);
`;

const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Turtle",
    picture: "🐢",
    characteristics: ["smart", "joyful"],
    status: {
      health: 100,
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
        <section key={pet.id}>
          <PetPictureContainer>
            <PetPicture>{pet.picture}</PetPicture>
            <PetName>{pet.name}</PetName>
          </PetPictureContainer>
          <PetCharContainer>
            Personality: {pet.characteristics.join(", ")}
          </PetCharContainer>
          <PetStatusContainer>
            <StatusBar>
              <Label>Health</Label>
              <Value>{pet.status.health}</Value>
            </StatusBar>
            <StatusBar>
              <Label>Hunger</Label>
              <Value>{pet.status.hunger}</Value>
            </StatusBar>
            <StatusBar>
              <Label>Happiness</Label>
              <Value>{pet.status.happiness}</Value>
            </StatusBar>
            <StatusBar>
              <Label>Energy</Label>
              <Value>{pet.status.energy}</Value>
            </StatusBar>
            <StatusBar>
              <Label>Intelligence</Label>
              <Value>{pet.status.intelligence}</Value>
            </StatusBar>
          </PetStatusContainer>
        </section>
      ))}
    </DetailsContainer>
  );
}
