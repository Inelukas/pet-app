import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import Indicator from "@/components/Indicator/Indicator";

const DetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  padding: 15px;
  width: 90vw;
  max-width: 600px;
  height: auto;
  min-height: 60vh;
  background-color: var(--secondary-color);
  border: 3px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  @media screen and (min-width: 1024px) {
    margin: 20px auto;
    padding: 20px;
    max-width: 800px;
  }

  @media screen and (min-width: 768px) {
    margin: 20px auto;
    padding: 20px;
    max-width: 700px;
  }

  @media screen and (min-width: 676px) {
    margin: 10px auto;
    padding: 10px;
    max-width: 600px;
  }
`;

const PetPictureContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--secondary-color);
  padding: 15px;
  border-radius: 10px;
  border: 3px solid black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
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
  border: 3px solid black;
  color: var(--text-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const PetStatusContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  border: 3px solid black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 50px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid black;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: var(--signal-color);
  transition: transform 0.2s ease;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

export default function PetDetails({ petCollection }) {
  const router = useRouter();
  const { id } = router.query;

  const pet = petCollection.find((pet) => pet.id == id);

  if (!pet) {
    return <p>No pet found!</p>;
  }

  const petStatus = [
    { name: "health", count: pet.status.health },
    { name: "happiness", count: pet.status.happiness },
    { name: "hunger", count: pet.status.hunger },
    { name: "energy", count: pet.status.energy },
    { name: "intelligence", count: pet.status.intelligence },
  ];

  return (
    <DetailsContainer>
      <PetPictureContainer>
        <PetPicture>{pet.picture}</PetPicture>
        <PetName>{pet.name}</PetName>
        <StyledLink href={`/update?id=${pet.id}&hideButtons=true`}>
          Update
        </StyledLink>
      </PetPictureContainer>
      <PetCharContainer>
        Personality: {pet.characteristics.join(", ")}
      </PetCharContainer>
      <PetStatusContainer>
        {petStatus.map((status, index) => (
          <Indicator key={index} data={status} />
        ))}
        <StyledLink href="/">Back</StyledLink>
      </PetStatusContainer>
    </DetailsContainer>
  );
}
