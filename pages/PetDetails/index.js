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
  margin: 20px;
  padding: 10px;
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
  border-radius: 10px;
  border: 1.5px solid black;
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

const PetStatus = styled.aside`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.p`
  font-weight: bold;
  margin-right: 10px;
`;

const ValueBar = styled.div`
  width: 100%;
  height: 2vh;
  background-color: var(--signal-color);
  border-radius: 5px;

  &::after {
    display: block;
    height: 100%;
    background-color: var(--primary-color);
    width: ${({ value }) => `${value}%`};
    transition: width 0.3s ease;
  }
`;

/* button button {
    width: 10vw;
    height: 5vh;
    border-radius: 10px;
    margin: 0 20px;
    box-shadow: 2px 2px black;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
*/

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
            <PetStatus>
              <Label>Health</Label>
              <ValueBar>{pet.status.health}</ValueBar>
            </PetStatus>
            <PetStatus>
              <Label>Hunger</Label>
              <ValueBar>{pet.status.hunger}</ValueBar>
            </PetStatus>
            <PetStatus>
              <Label>Happiness</Label>
              <ValueBar>{pet.status.happiness}</ValueBar>
            </PetStatus>
            <PetStatus>
              <Label>Energy</Label>
              <ValueBar>{pet.status.energy}</ValueBar>
            </PetStatus>
            <PetStatus>
              <Label>Intelligence</Label>
              <ValueBar>{pet.status.intelligence}</ValueBar>
            </PetStatus>
          </PetStatusContainer>
        </section>
      ))}
    </DetailsContainer>
  );
}
