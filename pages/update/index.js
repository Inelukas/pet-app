import { useRouter } from "next/router";
import CreatePetForm from "@/components/CreatePetForm/CreatePetForm";
import { StyledCreatePage } from "../create";

export default function UpdatePetPage({ petCollection, onUpdatePet }) {
  const router = useRouter();
  const { id, hideButtons } = router.query;

  const petToUpdate = petCollection.find((pet) => pet.id === id);

  if (!petToUpdate) {
    return <p>Pet not found!</p>;
  }

  return (
    <StyledCreatePage>
      <CreatePetForm
        initialData={petToUpdate}
        onUpdatePet={onUpdatePet}
        buttonLabel="Update"
        hideButtons={hideButtons === "true"}
      />
    </StyledCreatePage>
  );
}
