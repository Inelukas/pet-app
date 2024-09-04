import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { pets } from "@/lib/Data";
import { useRouter } from "next/router";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useState(pets);
  const [currentPet, setCurrentPet] = useState(...pets);
  const router = useRouter();

  function handleCreatePet(petData) {
    const { characteristic1, characteristic2, ...restPetData } = petData;
    const petId = uid();
    const newPet = {
      ...restPetData,
      id: petId,
      characteristics: [characteristic1, characteristic2].filter(Boolean),
    };
    setPetCollection((prevData) => [newPet, ...prevData]);

    router.push("/");
    setCurrentPet(newPet);
  }

  function handleDeletePet(id) {
    setPetCollection((prevPets) => prevPets.filter((pet) => pet.id != id));
  }
  function handleUpdatePet(updatedPetData) {
    setPetCollection((prevData) =>
      prevData.map((pet) =>
        pet.id === updatedPetData.id ? { ...pet, ...updatedPetData } : pet
      )
    );
    router.push(`/PetDetails/${updatedPetData.id}`);
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
      (pet) => pet.id === currentPet.id
    );
    if (direction === "next") {
      setCurrentPet(
        petCollection[(currentPetIndex + 1) % petCollection.length]
      );
    } else {
      setCurrentPet(
        petCollection[
          currentPetIndex > 0 ? currentPetIndex - 1 : petCollection.length - 1
        ]
      );
    }
  }

  function handleUpdatePetIndicator(score) {
    console.log("Score:", score, "happiness:", currentPet.status.happiness);
    setCurrentPet((prevPetData) => ({
      ...prevPetData,
      status: {
        ...prevPetData.status,
        happiness: Math.min(
          parseInt(prevPetData.status.happiness) + score,
          100
        ),
      },
    }));
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        petCollection={petCollection}
        currentPet={currentPet}
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
