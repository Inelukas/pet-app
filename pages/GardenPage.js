// GardenPage.js
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import StatusBar from "./StatusBar";

const StatusBarsContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

const PetDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const InteractionButton = styled.button`
  background-color: ${({ color }) => color || "#ddd"};
  color: #fff;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#bbb"};
  }
`;

const GardenPage = () => {
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(50);

  const handleFeed = () => setHunger((prev) => Math.max(prev - 10, 0));
  const handlePlay = () => setHappiness((prev) => Math.min(prev + 10, 100));
  const handleTrain = () => setEnergy((prev) => Math.min(prev + 10, 100));

  const handlePrevPet = () => {
    /* Logik zum Wechseln zum vorherigen Haustier */
  };
  const handleNextPet = () => {
    /* Logik zum Wechseln zum nächsten Haustier */
  };
  const handleListView = () => {
    /* Logik zum Zurückkehren zur Liste */
  };

  return (
    <GardenContainer
      style={{
        backgroundImage: "url(/path/to/your/background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <StatusBarsContainer>
        <StatusBar value={hunger} color="#ff6f61" />
        <StatusBar value={happiness} color="#6ccff6" />
        <StatusBar value={energy} color="#6fd66f" />
      </StatusBarsContainer>
      <Navbar
        onPrev={handlePrevPet}
        onNext={handleNextPet}
        onListView={handleListView}
      />
      <PetDisplay>
        {/* Aktuelles Haustier anzeigen (z.B. Emoji, Bild) */}
        🦄
      </PetDisplay>
      <div>
        <InteractionButton
          color="#ff6f61"
          hoverColor="#e35d55"
          onClick={handleFeed}
        >
          Feed
        </InteractionButton>
        <InteractionButton
          color="#6ccff6"
          hoverColor="#55a4d3"
          onClick={handlePlay}
        >
          Play
        </InteractionButton>
        <InteractionButton
          color="#6fd66f"
          hoverColor="#55b45a"
          onClick={handleTrain}
        >
          Train
        </InteractionButton>
      </div>
    </GardenContainer>
  );
};

export default GardenPage;
