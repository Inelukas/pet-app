import GardenPage from "@/components/GardenPage/GardenPage";

export default function Garden({ petCollection, onInteractPet }) {
  return (
    <GardenPage petCollection={petCollection} onInteractPet={onInteractPet} />
  );
}
