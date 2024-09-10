import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { pets } from "@/lib/data";
import { useRouter } from "next/router";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useState(pets);
  const [currentPet, setCurrentPet] = useState(pets[0].id);
  const activePet = petCollection.find((pet) => pet.id === currentPet);

  const [characteristicEffects, setCharacteristicEffects] = useState({
    speedFactor: 1,
    happinessFactor: 1,
    hungerFactor: 1,
    healthFactor: 1,
    energyFactor: 1,
  });

  useEffect(() => {
    if (activePet) {
      const speedFactor = getSpeedFactor(activePet.characteristics);
      const happinessFactor = getHappinessFactor(activePet.characteristics);
      const hungerFactor = getHungerFactor(activePet.characteristics);
      const healthFactor = getHealthFactor(activePet.characteristics);
      const energyFactor = getEnergyFactor(activePet.characteristics);

      setCharacteristicEffects({
        speedFactor,
        happinessFactor,
        hungerFactor,
        healthFactor,
        energyFactor,
      });
    }
  }, [activePet]);

  const router = useRouter();

  function handleCreatePet(petData) {
    const { characteristic1, characteristic2, ...restPetData } = petData;
    const petId = uid();
    const newPet = {
      ...restPetData,
      id: petId,
      characteristics: [characteristic1, characteristic2].filter(Boolean),
      alive: true,
    };
    setPetCollection((prevData) => [newPet, ...prevData]);
    router.push("/pet-list");
    setCurrentPet(newPet.id);
  }

  function handleDeletePet(id) {
    setPetCollection((prevPets) => prevPets.filter((pet) => pet.id != id));
    setCurrentPet(pets[0].id);
  }
  function handleUpdatePet(updatedPetData) {
    setPetCollection((prevData) =>
      prevData.map((pet) =>
        pet.id === updatedPetData.id
          ? {
              ...pet,
              ...updatedPetData,
              characteristics: [
                updatedPetData.characteristic1,
                updatedPetData.characteristic2,
              ].filter(Boolean),
              status: {
                ...pet.status,
                intelligence: updatedPetData.status.intelligence,
              },
            }
          : pet
      )
    );
    router.push(`/pet-details/${updatedPetData.id}`);
  }
  function handleInteractPet(updatedPetData) {
    setPetCollection((prevData) =>
      prevData.map((pet) =>
        pet.id === updatedPetData.id ? { ...pet, ...updatedPetData } : pet
      )
    );
  }

  function handleCurrentPet(direction) {
    const currentPetIndex = petCollection.findIndex(
      (pet) => pet.id === currentPet
    );
    if (direction === "next") {
      setCurrentPet(
        petCollection[(currentPetIndex + 1) % petCollection.length].id
      );
    } else {
      setCurrentPet(
        petCollection[
          currentPetIndex > 0 ? currentPetIndex - 1 : petCollection.length - 1
        ].id
      );
    }
  }

  function handleUpdatePetIndicator(score, indicator) {
    setPetCollection(
      petCollection.map((pet) => {
        return pet.id === currentPet
          ? {
              ...pet,
              status: {
                ...pet.status,
                [indicator]: score,
                intelligence: pet.status.intelligence + 1,
              },
            }
          : pet;
      })
    );
  }

  function getHappinessFactor(characteristics) {
    const moodFactor = characteristics.includes("cheerful")
      ? 0.5
      : characteristics.includes("melancholy")
      ? 1.5
      : 1;
    return moodFactor;
  }

  function getHungerFactor(characteristics) {
    const hungerFactor = characteristics.includes("gluttonous")
      ? 1.5
      : characteristics.includes("temperate")
      ? 0.5
      : 1;
    return hungerFactor;
  }

  function getEnergyFactor(characteristics) {
    const energyFactor = characteristics.includes("gluttonous")
      ? 0.5
      : characteristics.includes("temperate")
      ? 1.5
      : 1;
    return energyFactor;
  }

  function getSpeedFactor(characteristics) {
    const speedFactor = characteristics.includes("hyperactive")
      ? 0.4
      : characteristics.includes("lethargic")
      ? 2
      : 1;
    return speedFactor;
  }

  function getHealthFactor(characteristics) {
    const healthFactor = characteristics.includes("foolish")
      ? 0.5
      : characteristics.includes("smart")
      ? 1.5
      : 1;
    return healthFactor;
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        petCollection={petCollection}
        setPetCollection={setPetCollection}
        currentPet={currentPet}
        activePet={activePet}
        setCurrentPet={setCurrentPet}
        onCreatePet={handleCreatePet}
        onDeletePet={handleDeletePet}
        onUpdatePet={handleUpdatePet}
        onInteractPet={handleInteractPet}
        onCurrentPet={handleCurrentPet}
        onUpdatePetIndicator={handleUpdatePetIndicator}
        characteristicEffects={characteristicEffects}
      />
    </>
  );
}
