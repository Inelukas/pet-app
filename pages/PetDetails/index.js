import styled from "styled-components";
import { useRouter } from "next/router";

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
  margin: 10px;
`;

const Label = styled.p`
  font-weight: bold;
  margin-right: 50px;
`;

const ValueBar = styled.div`
  width: 20vh;
  height: 2vh;
  background-color: var(--signal-color);
  border-radius: 5px;
`;

const BackToListButton = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid black;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: var(--signal-color);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: var(--secondary-color);
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
      health: 100,
      hunger: 30,
      happiness: 85,
      energy: 30,
      intelligence: 100,
    },
  },
];

export default function PetDetails() {
  const router = useRouter();

  const handleBackToList = () => {
    router.push("/");
  };
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
      <BackToListButton onClick={handleBackToList}>Back</BackToListButton>
    </DetailsContainer>
  );
}
