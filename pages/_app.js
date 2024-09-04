import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
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
    setCurrentPet((prevPetData) => ({
      ...prevPetData,
      status: {
        ...prevPetData.status,
        happiness: score,
      },
    }));
  }

  useEffect(() => {
    setPetCollection(
      petCollection.map((pet) => {
        return pet.id === currentPet.id ? currentPet : pet;
      })
    );
  }, [currentPet]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        petCollection={petCollection}
        currentPet={currentPet}
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
