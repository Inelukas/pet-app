import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { pets } from "@/lib/data";
import { useRouter } from "next/router";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useLocalStorageState(
    "petCollection",
    {
      defaultValue: [],
    }
  );
  const [currentPet, setCurrentPet] = useLocalStorageState("currentPet", {
    defaultValue: petCollection[0]?.id || null,
  });
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
    setCurrentPet(petCollection[0]?.id || null);
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
              },
            }
          : pet;
      })
    );
  }

  const activePet = petCollection.find((pet) => pet.id === currentPet);

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
      />
    </>
  );
}
