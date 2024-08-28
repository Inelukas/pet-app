import styled from "styled-components";
import { useRouter } from "next/router";
import pets from "@/Lib/Data";
import Indicator from "@/Component/Indicator/Indicator";

const DetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 15px;
  background-color: var(--neutral-color);
  border-radius: 10px;
  box-shadow: 0px 12px 28px 0px rgba(0, 0, 0, 0.2),
    0px 2px 4px 0px rgba(0, 0, 0, 0.1),
    0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset;
  width: 90vw;
  max-width: 600px;

  @media screen and (min-width: 1024px) {
    margin: 20px;
    padding: 20px;
  }

  @media screen and (min-width: 768px) {
    margin: 15px;
    padding: 15px;
  }

  @media screen and (min-width: 676px) {
    margin: 10px;
    padding: 10px;
  }
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
  background-color: var(--secondary-color);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 12px 28px 0px rgba(0, 0, 0, 0.2),
    0px 2px 4px 0px rgba(0, 0, 0, 0.1),
    0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset;
  margin-bottom: 20px;
  width: 100%;
`;

const PetPicture = styled.section`
  width: 8vh;
  height: 8vh;
  border-radius: 10px;
  border: 1.5px solid black;
  background-color: var(--neutral-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5vh;
  margin-bottom: 10px;
`;

const PetName = styled.p`
  display: flex;
  font-size: 15px;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
  margin: 5px;
  padding: 5px;
  background-color: var(--neutral-color);
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
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: var(--text-color);
  box-shadow: 0px 12px 28px 0px rgba(0, 0, 0, 0.2),
    0px 2px 4px 0px rgba(0, 0, 0, 0.1),
    0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset;

  @media screen and (min-width: 768px) {
    padding: 15px;
    font-size: 18px;
  }
`;

const PetStatusContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  box-shadow: 0px 12px 28px 0px rgba(0, 0, 0, 0.2),
    0px 2px 4px 0px rgba(0, 0, 0, 0.1),
    0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    padding: 20px;
  }

  & > div {
    min-width: 75%;
  }
`;

const BackToListButton = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid black;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: var(--signal-color);
  transition: transform 0.2 ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function PetDetails() {
  const router = useRouter();
  const { id } = router.query;

  const pet = pets.find((pet) => pet.id === parseInt(id));

  if (!pet) {
    return <p>No pet found!</p>;
  }

  const petStatus = [
    { name: "Health", count: pet.status.health },
    { name: "Happiness", count: pet.status.happiness },
    { name: "Hunger", count: pet.status.hunger },
    { name: "Energy", count: pet.status.energy },
    { name: "Intelligence", count: pet.status.intelligence },
  ];

  const handleBackToList = () => {
    router.push("/");
  };

  return (
    <DetailsContainer>
      <Header>Pet Details</Header>
      <PetPictureContainer>
        <PetPicture>{pet.picture}</PetPicture>
        <PetName>{pet.name}</PetName>
      </PetPictureContainer>
      <PetCharContainer>
        Personality: {pet.characteristics.join(", ")}
      </PetCharContainer>
      <PetStatusContainer>
        {petStatus.map((status, index) => (
          <Indicator key={index} data={status} />
        ))}
        <BackToListButton onClick={handleBackToList}>Back</BackToListButton>
      </PetStatusContainer>
    </DetailsContainer>
  );
}
