import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { pets } from "@/lib/data";
import { useRouter } from "next/router";
import { uid } from "uid";
import PageButtons from "@/components/PageButtons/PageButtons";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useState(pets);
  const [currentPetID, setCurrentPetID] = useState(pets[0].id);
  const activePet = petCollection.find((pet) => pet.id === currentPetID);
  const router = useRouter();

  function handleCreatePet(petData) {
    const { characteristic1, characteristic2, ...restPetData } = petData;
    const petId = uid();
    const newPet = {
      ...restPetData,
      id: petId,
      characteristics: [characteristic1, characteristic2].filter(Boolean),
      isAlive: true,
    };
    setPetCollection((prevData) => [newPet, ...prevData]);
    router.push("/pet-list");
    setCurrentPetID(newPet.id);
  }

  function handleDeletePet(id) {
    setPetCollection((prevPets) => prevPets.filter((pet) => pet.id != id));
    setCurrentPetID(pets[0].id);
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
                Intelligence: updateIntelligence(pet, updatedPetData),
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

  function updateIntelligence(pet, updatedPetData) {
    const { characteristic1, characteristic2 } = updatedPetData;

    if (characteristic1 === "smart" || characteristic2 === "smart") {
      return pet.characteristics.includes("foolish")
        ? pet.status.Intelligence + 40
        : pet.characteristics.includes("smart")
        ? pet.status.Intelligence
        : pet.status.Intelligence + 20;
    } else if (characteristic1 === "foolish" || characteristic2 === "foolish") {
      return pet.characteristics.includes("smart")
        ? pet.status.Intelligence - 40
        : pet.characteristics.includes("foolish")
        ? pet.status.Intelligence
        : pet.status.Intelligence - 20;
    } else if (pet.characteristics.includes("foolish")) {
      return pet.status.Intelligence + 20;
    } else if (pet.characteristics.includes("smart")) {
      return pet.status.Intelligence - 20;
    } else {
      return pet.status.Intelligence;
    }
  }

  function handleCurrentPet(direction) {
    const currentPetIndex = petCollection.findIndex(
      (pet) => pet.id === currentPetID
    );
    if (direction === "next") {
      setCurrentPetID(
        petCollection[(currentPetIndex + 1) % petCollection.length].id
      );
    } else {
      setCurrentPetID(
        petCollection[
          currentPetIndex > 0 ? currentPetIndex - 1 : petCollection.length - 1
        ].id
      );
    }
  }

  function handleUpdatePetIndicator(score, indicator) {
    const newIndicatorValue =
      indicator === "Happiness"
        ? Math.min(activePet.status.Happiness + score * 5, 100)
        : indicator === "Hunger"
        ? 0
        : Math.min(activePet.status.Energy + score * 2, 100);
    setPetCollection(
      petCollection.map((pet) => {
        return pet.id === currentPetID
          ? {
              ...pet,
              status: {
                ...pet.status,
                [indicator]: newIndicatorValue,
                Intelligence: Math.min(
                  pet.status.Intelligence +
                    (score >= 5 || indicator === "Hunger"
                      ? getIntelligenceFactor(activePet.characteristics)
                      : 0),
                  100
                ),
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
    const HungerFactor = characteristics.includes("gluttonous")
      ? 1.5
      : characteristics.includes("temperate")
      ? 0.5
      : 1;
    return HungerFactor;
  }

  function getEnergyFactor(characteristics) {
    const EnergyFactor = characteristics.includes("gluttonous")
      ? 0.5
      : characteristics.includes("temperate")
      ? 1.5
      : 1;
    return EnergyFactor;
  }

  function getSpeedFactor(characteristics) {
    const speedFactor = characteristics.includes("hyperactive")
      ? 0.4
      : characteristics.includes("lethargic")
      ? 2
      : 1;
    return speedFactor;
  }

  function getIntelligenceFactor(characteristics) {
    const IntelligenceFactor = characteristics.includes("cheerful")
      ? 0.5
      : characteristics.includes("melancholy")
      ? 1.5
      : 1;
    return IntelligenceFactor;
  }

  function getHealthFactor(characteristics) {
    const HealthFactor = characteristics.includes("foolish")
      ? 0.5
      : characteristics.includes("smart")
      ? 1.5
      : 1;
    return HealthFactor;
  }
  function handleDeadPet() {
    setPetCollection((prevPets) =>
      prevPets.map((pet) => {
        if (pet.id === currentPetID) {
          return {
            ...pet,
            isDying: false,
            isAlive: false,
            timeOfDeath: new Date().toISOString(),
          };
        }
        return pet;
      })
    );
  }
  return (
    <>
      <GlobalStyle $isGraveyard={router.pathname === "/graveyard"} />
      <Header />
      <Component
        {...pageProps}
        petCollection={petCollection}
        setPetCollection={setPetCollection}
        currentPetID={currentPetID}
        activePet={activePet}
        onCurrentPetID={setCurrentPetID}
        onCreatePet={handleCreatePet}
        onDeletePet={handleDeletePet}
        onUpdatePet={handleUpdatePet}
        onInteractPet={handleInteractPet}
        onCurrentPet={handleCurrentPet}
        onUpdatePetIndicator={handleUpdatePetIndicator}
        onDeadPet={handleDeadPet}
        onHealthFactor={getHealthFactor}
        onIntelligenceFactor={getIntelligenceFactor}
        onEnergyFactor={getEnergyFactor}
        onHappinessFactor={getHappinessFactor}
        onHungerFactor={getHungerFactor}
        onSpeedFactor={getSpeedFactor}
        onPetCollection={setPetCollection}
      />
      <PageButtons router={router} activePet={activePet} />
    </>
  );
}
