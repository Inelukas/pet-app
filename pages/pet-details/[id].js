import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import Indicator from "@/components/Indicator/Indicator";
import { useState } from "react";
import Image from "next/image";
import deleteIcon from "../../public/assets/delete.png";
import updateIcon from "../../public/assets/edit.png";

const DetailsPage = styled.main`
  height: 80vh;
`;

const DetailsContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 0 5vw;
  padding: 10px;
  width: 90%;
  max-width: 800px;
  height: 500px;
  min-height: 60vh;
  background-color: var(--secondary-color);
  border: 3px solid #000000;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 1rem;

  @media screen and (min-width: 600px) {
    margin: 10px auto;
  }
`;

const PetPictureContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: var(--secondary-color);
  padding: 15px;
  border-radius: 10px;
  border: 3px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  width: 100%;
  position: relative;
`;

const PetPicture = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  border: 1.5px solid #000000;
  background-color: var(--neutral-color);
  margin-bottom: 10px;
  padding: 5px;
`;

const PetName = styled.p`
  display: flex;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
  margin: 5px;
  padding: 5px;
  background-color: var(--neutral-color);
  border: 1.5px solid #000000;
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
  border: 3px solid #000000;
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
  border: 3px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const StyledDeleteContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  font-size: 0.9rem;
  padding: 20px;
  background-color: var(--primary-color);
  color: #ffffff;
  border: 2px solid #ff0000;
  border-radius: 15px;
  box-shadow: 2px 2px #000000;
  z-index: 2;
  cursor: pointer;

  @media screen and (min-width: 600px) {
    font-size: 1rem;
    width: 350px;
  }
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const DeleteButtonChoice = styled.span`
  &:hover {
    transform: scale(1.2);
    text-decoration: underline;
  }
`;

const StyledDeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 12px;
  opacity: 0.5;
  color: #ffffff;

  &:hover {
    transform: scale(1.2);
    opacity: 1;
    box-shadow: 3px 3px var(--signal-color);
    border-radius: 20px;
  }
`;

const StyledUpdateButton = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  opacity: 0.5;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    transform: scale(1.2);
    opacity: 1;
    box-shadow: 3px 3px var(--signal-color);
    border-radius: 20px;
  }
`;

const PictureAndDeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default function PetDetails({ petCollection, onDeletePet }) {
  const router = useRouter();
  const { id } = router.query;

  const pet = petCollection.find((pet) => pet.id == id);

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  const confirmDelete = () => {
    onDeletePet(id);
    setIsDelete(false);
    router.push("/pet-list/");
  };

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
    <DetailsPage>
      <DetailsContainer>
        <PetPictureContainer>
          <PictureAndDeleteContainer>
            <PetPicture>
              <Image
                src={pet.alive ? pet.image : "/assets/images/tombstone.png"}
                alt={pet.name || "A cute pet"}
                width={50}
                height={50}
                quality={100}
                sizes="(min-width: 600px) 600px, (min-width: 1200px) 1000px, 500px"
              />
            </PetPicture>

            {isDelete && (
              <StyledDeleteContainer>
                <p>Are you sure you want to delete your Pet?</p>
                <DeleteButtonContainer>
                  <DeleteButtonChoice onClick={confirmDelete}>
                    Yes
                  </DeleteButtonChoice>
                  <DeleteButtonChoice onClick={handleDelete}>
                    No
                  </DeleteButtonChoice>
                </DeleteButtonContainer>
              </StyledDeleteContainer>
            )}
            <StyledDeleteButton onClick={handleDelete}>
              <Image src={deleteIcon} alt="Delete Icon" width={25} />
            </StyledDeleteButton>
          </PictureAndDeleteContainer>
          <PetName>{pet.name}</PetName>
          <StyledUpdateButton $disabled={!pet.alive}>
            {pet.alive ? (
              <Link href={`/update?id=${pet.id}&hideButtons=true`}>
                <Image src={updateIcon} alt="Update Icon" width={25} />
              </Link>
            ) : (
              <Image src={updateIcon} alt="Update Icon" width={25} />
            )}
          </StyledUpdateButton>
        </PetPictureContainer>
        <PetCharContainer>
          Personality: {pet.characteristics.join(", ")}
        </PetCharContainer>
        <PetStatusContainer>
          {petStatus.map((status, index) => (
            <Indicator key={index} data={status} />
          ))}
        </PetStatusContainer>
      </DetailsContainer>
    </DetailsPage>
  );
}
