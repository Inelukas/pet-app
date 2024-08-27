import styled from "styled-components";

const DetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  max-width: 300px;
  background-color: var(--neutral-color);
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.header`
  font-size: 1.5rem;
  color: var(--primary-color);
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

const PetName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
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
  margin: 10px 0;
  width: fit-content;
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
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: var(--primary-color);

  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .value {
    font-size: 12px;
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
        <section key={pet.id}>
          <PetPictureContainer>
            <section className="portrait">
              <span>{pet.picture}</span>
            </section>
            <PetName>{pet.name}</PetName>
          </PetPictureContainer>
          <PetCharContainer>
            Personality: {pet.characteristics.join(", ")}
          </PetCharContainer>
          <PetStatusContainer>
            <StatusBar>
              <aside className="label">Hunger</aside>
              <aside className="value">{pet.status.hunger}</aside>
            </StatusBar>
            <StatusBar>
              <aside className="label">Happiness</aside>
              <aside className="value">{pet.status.happiness}</aside>
            </StatusBar>
            <StatusBar>
              <aside className="label">Energy</aside>
              <aside className="value">{pet.status.energy}</aside>
            </StatusBar>
            <StatusBar>
              <aside className="label">Intelligence</aside>
              <aside className="value">{pet.status.intelligence}</aside>
            </StatusBar>
          </PetStatusContainer>
        </section>
      ))}
    </DetailsContainer>
  );
}
