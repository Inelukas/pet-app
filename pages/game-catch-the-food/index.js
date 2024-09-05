import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";
import PlayerAvatar from "@/components/GameCatchTheFood/PlayerAvatar/PlayerAvatar";
import FallingBlocks from "@/components/GameCatchTheFood/FallingBlocks/FallingBlocks";
import SummaryScreen from "@/components/GameCatchTheFood/SummaryScreen/SummaryScreen";
import Indicator from "@/components/Indicator/Indicator";
import { uid } from "uid";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 800px;
  padding: 20px;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: var(--neutral-color);
`;

const StyledIndicatorContainer = styled.article`
  position: absolute;
  left: -250px;
  top: 200px;
  transform: rotate(270deg);
  width: 100%;
  justify-content: center;
  z-index: 1;
`;

const GameFieldContainer = styled.article`
  position: relative;
  display: flex;
  width: 400px;
  height: 600px;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: var(--secondary-color);
  overflow: hidden;
`;

const PlayButton = styled.button`
  width: 80px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
`;

const Counter = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const LeftButton = styled.button`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const RightButton = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const getRandomItem = () => {
  const items = [
    { type: "good", name: "Broccoli", icon: "🥦" },
    { type: "good", name: "Carrot", icon: "🥕" },
    { type: "good", name: "Banana", icon: "🍌" },
    { type: "good", name: "Hamburger", icon: "🍔" },
    { type: "bad", name: "Oildrum", icon: "🛢️" },
    { type: "bad", name: "Toilet", icon: "🚽" },
    { type: "bad", name: "Pool 8 Ball", icon: "🎱" },
  ];

  const randomX = Math.floor(Math.random() * 360);

  return {
    ...items[Math.floor(Math.random() * items.length)],
    x: randomX,
    y: 0,
    id: uid(),
  };
};

const AvatarContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 30px;
  bottom: 30px;
  z-index: 1;
`;
export default function GamePage({
  petCollection,
  currentPet,
  onUpdatePetIndicator,
}) {
  const activePet = petCollection.find((pet) => pet.id === currentPet);

  const [items, setItems] = useState([]);
  const [avatarX, setAvatarX] = useState(180);
  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [hunger, setHunger] = useState(activePet?.status.hunger);

  const startGame = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setGameTime(0);
      setCounter(0);
      setItems([]);
      setGameEnded(false);
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    if (isPlaying && !gameEnded) {
      const interval = setInterval(() => {
        setItems((prevItems) => [...prevItems, getRandomItem()]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameEnded]);

  const moveAvatar = (direction) => {
    setAvatarX((prevX) => Math.max(0, Math.min(360, prevX + direction)));
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!isPlaying || gameEnded) return;
      if (event.key === "ArrowLeft") {
        moveAvatar(-5);
      } else if (event.key === "ArrowRight") {
        moveAvatar(5);
      }
    },
    [isPlaying, gameEnded]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const avatarXRef = useRef(avatarX);
  avatarXRef.current = avatarX;

  useEffect(() => {
    if (isPlaying && !gameEnded) {
      const interval = setInterval(() => {
        setItems((prevItems) =>
          prevItems
            .map((item) => ({
              ...item,
              y: item.y + 10,
            }))
            .filter((item) => {
              let isCaught =
                item.y >= 570 && Math.abs(item.x - avatarXRef.current) < 30;
              if (isCaught) {
                if (item.type === "good") {
                  setCounter((prev) => prev + 0.5);
                  setHunger((prevHunger) => Math.max(0, prevHunger - 2.5));
                } else if (item.type === "bad") {
                  setCounter((prev) => prev + 0.5);
                  setHunger((prevHunger) => Math.min(100, prevHunger + 2.5));
                }
                return false;
              }

              if (item.y >= 570) {
                return false;
              }

              return true;
            })
        );
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameEnded]);

  useEffect(() => {
    if (hunger === 0) {
      const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
      setGameTime(timeElapsed);
      setGameEnded(true);
      setIsPlaying(false);
      onUpdatePetIndicator(hunger, "hunger");
    }
  }, [hunger, startTime, onUpdatePetIndicator]);

  if (gameEnded) {
    return <SummaryScreen itemsCaught={counter} timeTaken={gameTime} />;
  }

  return (
    <Wrapper>
      <Container>
        <h1>Catch The Food</h1>
        <br />
        <StyledIndicatorContainer>
          <Indicator
            data={{
              name: "hunger",
              count: hunger,
            }}
            showBarName={false}
          />
        </StyledIndicatorContainer>
        <GameFieldContainer>
          {items.map((item) => (
            <FallingBlocks key={item.id} item={item} />
          ))}
          <PlayerAvatar x={avatarX} picture={activePet.picture} />
        </GameFieldContainer>
        <Counter>Items caught: {counter}</Counter>
        <div>
          <LeftButton
            onClick={() => moveAvatar(-10)}
            disabled={!isPlaying || gameEnded}
          >
            Left
          </LeftButton>
          <RightButton
            onClick={() => moveAvatar(10)}
            disabled={!isPlaying || gameEnded}
          >
            Right
          </RightButton>
        </div>
        {!isPlaying && <PlayButton onClick={startGame}>Play</PlayButton>}
      </Container>
    </Wrapper>
  );
}
