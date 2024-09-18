import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useState, useEffect } from "react";
import { pets } from "@/lib/data";
import { useRouter } from "next/router";
import { uid } from "uid";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import { useRef } from "react";
import PageButtons from "@/components/PageButtons/PageButtons";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useLocalStorageState(
    "PetCollection",
    { defaultValue: [] }
  );
  const [currentPetID, setCurrentPetID] = useLocalStorageState(
    "CurrentPetID",
    /* petCollection[0]?.id  ||*/ null
  );
  const [totalTimeSpent, setTotalTimeSpent] = useLocalStorageState(
    "TotalTimeSpent",
    0
  );
  const activePet = petCollection?.find((pet) => pet.id === currentPetID);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const router = useRouter();

  // Achievement state managed here
  const [achievements, setAchievements] = useLocalStorageState("Achievements", {
    defaultValue: {
      food: [false, false, false, false, false],
      play: [false, false, false, false, false],
      furniture: [false, false, false, false, false],
    },
  });

  const [totalPoints, setTotalPoints] = useLocalStorageState("TotalPoints", {
    defaultValue: {
      snake: 0,
      tapping: 0,
      catchfood: 0,
    },
  });

  // Function to update achievements
  function handleUpdateAchievements(category, index) {
    setAchievements((prevAchievements) => {
      // Check if achievement is already unlocked
      if (prevAchievements[category][index]) return prevAchievements;

      const updatedCategory = [...prevAchievements[category]];
      updatedCategory[index] = true; // Unlock the achievement

      return { ...prevAchievements, [category]: updatedCategory };
    });
  }

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
    setCurrentPetID(pets[0].id || null);
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
                intelligence: updateIntelligence(pet, updatedPetData),
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
        ? pet.status.intelligence + 40
        : pet.characteristics.includes("smart")
        ? pet.status.intelligence
        : pet.status.intelligence + 20;
    } else if (characteristic1 === "foolish" || characteristic2 === "foolish") {
      return pet.characteristics.includes("smart")
        ? pet.status.intelligence - 40
        : pet.characteristics.includes("foolish")
        ? pet.status.intelligence
        : pet.status.intelligence - 20;
    } else if (pet.characteristics.includes("foolish")) {
      return pet.status.intelligence + 20;
    } else if (pet.characteristics.includes("smart")) {
      return pet.status.intelligence - 20;
    } else {
      return pet.status.intelligence;
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
      indicator === "happiness"
        ? Math.min(activePet.status.happiness + score * 5, 100)
        : indicator === "hunger"
        ? 0
        : Math.min(activePet.status.energy + score * 2, 100);
    setPetCollection(
      petCollection.map((pet) => {
        return pet.id === currentPetID
          ? {
              ...pet,
              status: {
                ...pet.status,
                [indicator]: newIndicatorValue,
                intelligence: Math.min(
                  pet.status.intelligence +
                    (score >= 5 || indicator === "hunger"
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

  function handleTotalPoints(game) {
    setTotalPoints((prevValues) => {
      return {
        snake: game === "snake" ? prevValues.snake + 1 : prevValues.snake,
        tapping:
          game === "tapping" ? prevValues.tapping + 1 : prevValues.tapping,
        catchfood:
          game === "catchfood"
            ? prevValues.catchfood + 1
            : prevValues.catchfood,
      };
    });
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

  function getIntelligenceFactor(characteristics) {
    const intelligenceFactor = characteristics.includes("cheerful")
      ? 0.5
      : characteristics.includes("melancholy")
      ? 1.5
      : 1;
    return intelligenceFactor;
  }

  function getHealthFactor(characteristics) {
    const healthFactor = characteristics.includes("foolish")
      ? 0.5
      : characteristics.includes("smart")
      ? 1.5
      : 1;
    return healthFactor;
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

  let soundtrack;

  if (router.pathname === "/snake") {
    soundtrack = "/assets/music/snake-game-soundtrack.mp3";
  } else if (router.pathname === "/tapping") {
    soundtrack = "/assets/music/tapping-game-soundtrack.mp3";
  } else if (router.pathname === "/game-catch-the-food") {
    soundtrack = "/assets/music/catch-the-food-game-soundtrack.mp3";
  } else if (router.pathname === "/graveyard") {
    soundtrack = "/assets/music/graveyard-soundtrack.mp3";
  } else {
    soundtrack = "/assets/music/birds-chirping-main-sound.mp3";
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [router.pathname]);

  function togglePlayPause() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function handleVolumeChange(value) {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    setVolume(value);
  }

  function togglePlayer() {
    setIsExpanded(!isExpanded);
  }

  function handlePlay() {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const includedRoutes = [
    "/",
    "/garden",
    "/snake",
    "/tapping",
    "/game-catch-the-food",
  ];

  return (
    <>
      <GlobalStyle />
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
        achievements={achievements}
        onUpdateAchievements={handleUpdateAchievements}
        totalPoints={totalPoints}
        onTotalPoints={handleTotalPoints}
        totalTimeSpent={totalTimeSpent}
        onTotalTimeSpent={setTotalTimeSpent}
      />
      <audio ref={audioRef} src={soundtrack} preload="auto" loop />
      {includedRoutes.includes(router.pathname) && (
        <MusicPlayer
          isPlaying={isPlaying}
          volume={volume}
          isExpanded={isExpanded}
          audioRef={audioRef}
          onTogglePlayPause={togglePlayPause}
          onVolumeChange={handleVolumeChange}
          onTogglePlayer={togglePlayer}
          onPlay={handlePlay}
        />
      )}
      <PageButtons router={router} activePet={activePet} />
    </>
  );
}
