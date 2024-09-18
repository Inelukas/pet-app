import { useRouter } from "next/router";
import CreatePetForm from "@/components/CreatePetForm/CreatePetForm";
import { StyledCreatePage } from "../create";

export default function UpdatePetPage({
  petCollection,
  onUpdatePet,
  activePet,
}) {
  const router = useRouter();
  const { id } = router.query;

  if (!activePet) {
    return <p>Pet not found!</p>;
  }

  return (
    <StyledCreatePage>
      <CreatePetForm
        initialData={activePet}
        onUpdatePet={onUpdatePet}
        hideButtons={true}
        createPet={true}
      />
    </StyledCreatePage>
  );
}
