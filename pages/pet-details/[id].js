import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import Indicator from "@/components/Indicator/Indicator";
import { useState } from "react";
import Image from "next/image";
import deleteIcon from "../../public/assets/delete.png";
import updateIcon from "../../public/assets/edit.png";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import cancelIcon from "../../public/assets/cancel.png";
import confirmIcon from "../../public/assets/confirm.png";

const DetailsPage = styled.main`
  height: 80vh;
  padding-top: 80px;
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
  background: transparent;

  border-radius: 10px;

  font-size: 1rem;

  @media screen and (min-width: 600px) {
    margin: 10px auto;
  }
`;

const PetPictureContainer = styled.section`
  display: flex;
  box-shadow: var(--global-shadow);
  flex-direction: column;
  align-items: center;
  position: absolute;
  background: var(--secondary-gradient);
  padding: 15px;
  border-radius: 10px;

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
  box-shadow: var(--global-shadow);
  background: var(--signal-gradient);
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
  background: var(--signal-gradient);

  border-radius: 10px;
  box-shadow: var(--global-shadow);
`;

const PetCharContainer = styled.section`
  display: flex;
  justify-content: center;
  background: var(--secondary-gradient);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;

  box-shadow: var(--global-shadow);
`;

const PetStatusContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background: var(--secondary-gradient);
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  text-transform: capitalize;
  box-shadow: var(--global-shadow);
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
  font-size: 1rem;
  padding: 20px;
  background: var(--signal-gradient);
  font-weight: bold;

  border-radius: 15px;
  box-shadow: var(--global-shadow);
  z-index: 2;
  cursor: pointer;

  @media screen and (min-width: 600px) {
    width: 350px;
  }
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const StyledDeleteButton = styled.button`
  border: none;
  background: var(--signal-gradient);
  cursor: pointer;
  width: 35px;
  height: 35px;
  position: absolute;
  right: 12px;
  box-shadow: var(--global-shadow);
  border-radius: 50px;
  background-size: contain;
  &:hover {
    transform: scale(1.2);

    background: var(--neutral-gradient);
  }
`;

const StyledUpdateButton = styled.button`
  border: none;
  position: absolute;
  top: 60px;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background: var(--signal-gradient);
  right: 12px;
  background-size: contain;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  box-shadow: var(--global-shadow);
  &:hover {
    transform: scale(1.2);
    background: var(--neutral-gradient);
  }
`;

const DeleteChoiceButton = styled(ConfirmButton)`
  &:hover {
    background: var(--primary-gradient);
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
                src={
                  pet.isAlive
                    ? pet.image
                    : pet.isRevived
                    ? "/assets/images/ghost.png"
                    : "/assets/images/tombstone.png"
                }
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
                  <DeleteChoiceButton onClick={confirmDelete}>
                    <Image
                      src={confirmIcon}
                      alt="Confirm Icon"
                      width={40}
                      height={40}
                    />
                  </DeleteChoiceButton>
                  <DeleteChoiceButton onClick={handleDelete}>
                    <Image
                      src={cancelIcon}
                      alt="Cancel Icon"
                      width={40}
                      height={40}
                    />
                  </DeleteChoiceButton>
                </DeleteButtonContainer>
              </StyledDeleteContainer>
            )}
            <StyledDeleteButton onClick={handleDelete}>
              <Image src={deleteIcon} alt="Delete Icon" width={25} />
            </StyledDeleteButton>
          </PictureAndDeleteContainer>
          <PetName>{pet.name}</PetName>
          <StyledUpdateButton $disabled={!pet.alive}>
            {pet.isAlive ? (
              <Link href={`/update?id=${pet.id}&hideButtons=true`}>
                <Image src={updateIcon} alt="Update Icon" width={25} />
              </Link>
            ) : (
              <Image src={updateIcon} alt="Update Icon" width={25} />
            )}
          </StyledUpdateButton>
        </PetPictureContainer>
        <PetCharContainer>
          <b>Personality:&nbsp;</b> {pet.characteristics.join(", ")}
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
