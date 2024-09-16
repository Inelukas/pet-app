import { GlobalStyle } from "@/GlobalStyles";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { pets } from "@/lib/data";
import { useRouter } from "next/router";
import { uid } from "uid";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import { useRef } from "react";

export default function App({ Component, pageProps }) {
  const [petCollection, setPetCollection] = useState(pets);
  const [currentPet, setCurrentPet] = useState(pets[0].id);
  const activePet = petCollection.find((pet) => pet.id === currentPet);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(33);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

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
    const newIndicatorValue =
      indicator === "happiness"
        ? Math.min(activePet.status.happiness + score, 100)
        : indicator === "hunger"
        ? 0
        : Math.min(activePet.status.energy + score, 100);
    setPetCollection(
      petCollection.map((pet) => {
        return pet.id === currentPet
          ? {
              ...pet,
              status: {
                ...pet.status,
                [indicator]: newIndicatorValue,
                intelligence: Math.min(
                  pet.status.intelligence +
                    (score >= 5
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
        if (pet.id === currentPet) {
          return { ...pet, dying: false, alive: false };
        }
        return pet;
      })
    );
  }

  let soundtrack;
  if (
    router.pathname === "/" ||
    router.pathname === "/garden" ||
    router.pathname === "/pet-details" ||
    router.pathname === "/create" ||
    router.pathname === "/update"
  ) {
    soundtrack = "/assets/music/birds-chirping-main-sound.mp3";
  } else if (router.pathname === "/snake") {
    soundtrack = "/assets/music/snake-game-soundtrack.mp3";
  } else if (router.pathname === "/tapping") {
    soundtrack = "/assets/music/tapping-game-soundtrack.mp3";
  } else if (router.pathname === "/game-catch-the-food") {
    soundtrack = "/assets/music/catch-the-food-game-soundtrack.mp3";
  } else if (router.pathname === "/graveyard") {
    soundtrack = "/assets/music/graveyard-soundtrack.mp3";
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    setVolume(value);
  };

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (audioRef.current.src !== window.location.origin + soundtrack) {
        audioRef.current.src = soundtrack;
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    }
  }, [soundtrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

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
        onDeadPet={handleDeadPet}
        onHealthFactor={getHealthFactor}
        onIntelligenceFactor={getIntelligenceFactor}
        onEnergyFactor={getEnergyFactor}
        onHappinessFactor={getHappinessFactor}
        onHungerFactor={getHungerFactor}
        onSpeedFactor={getSpeedFactor}
      />
      <audio ref={audioRef} src={soundtrack} preload="auto" autoPlay loop />
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
    </>
  );
}
