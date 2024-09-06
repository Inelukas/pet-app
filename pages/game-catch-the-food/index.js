import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";
import PlayerAvatar from "@/components/GameCatchTheFood/PlayerAvatar/PlayerAvatar";
import FallingBlocks from "@/components/GameCatchTheFood/FallingBlocks/FallingBlocks";
import SummaryScreen from "@/components/GameCatchTheFood/SummaryScreen/SummaryScreen";
import Indicator from "@/components/Indicator/Indicator";
import Link from "next/link";
import GameButton from "@/components/GameButton/GameButton";
import { uid } from "uid";

const MainPage = styled.section`
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
  width: 300px;
  height: 600px;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: var(--neutral-color);

  @media screen and (min-width: 600px) {
    transform: scale(1.2);
  }

  @media screen and (min-width: 900px) {
    transform: scale(1.5);
  }
`;

const GameFieldContainer = styled.article`
  display: flex;
  position: relative;
  width: 90%;
  height: 75%;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: var(--secondary-color);
  overflow: hidden;
`;

const StyledIndicatorContainer = styled.article`
  position: absolute;
  left: -168px;
  top: 150px;
  transform: rotate(270deg);
  width: 100%;
  justify-content: center;
`;

const AvatarContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 30px;
`;

const Counter = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
`;

const ButtonContainer = styled.article`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const LeftButton = styled.button`
  width: 45px;
  height: 45px;
  margin-right: 6px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const RightButton = styled.button`
  width: 45px;
  height: 45px;
  margin-left: 6px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const BackButton = styled(GameButton)`
  width: 45px;
  height: 30px;
  background-color: var(--signal-color);
  margin-right: 6px;
`;

const PlayButton = styled(GameButton)`
  width: 45px;
  height: 30px;
  background-color: #4caf50;
  margin-left: 6px;
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

  const randomX = Math.floor(Math.random() * 240);

  return {
    ...items[Math.floor(Math.random() * items.length)],
    x: randomX,
    y: 0,
    id: uid(),
  };
};
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
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameEnded]);

  const moveAvatar = (direction) => {
    setAvatarX((prevX) => Math.max(0, Math.min(233, prevX + direction)));
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!isPlaying || gameEnded) return;
      if (event.key === "ArrowLeft") {
        moveAvatar(-10);
      } else if (event.key === "ArrowRight") {
        moveAvatar(10);
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
    let interval;

    if (isPlaying && !gameEnded) {
      interval = setInterval(() => {
        setItems((prevItems) =>
          prevItems
            .map((item) => ({
              ...item,
              y: item.y + 5,
            }))
            .filter((item) => {
              let isCaught =
                item.y >= 340 && Math.abs(item.x - avatarXRef.current) < 20;
              if (isCaught) {
                if (item.type === "good") {
                  setCounter((prev) => prev + 1);
                  setHunger((prevHunger) => Math.max(0, prevHunger - 5));
                } else if (item.type === "bad") {
                  setCounter((prev) => prev + 1);
                  setHunger((prevHunger) => Math.min(100, prevHunger + 5));
                }
                return false;
              }

              if (item.y >= 370) {
                return false;
              }

              return true;
            })
        );
      }, 50);
    }

    if (gameEnded) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, gameEnded]);

  useEffect(() => {
    if (isPlaying && hunger === 0) {
      setGameEnded(true);
      setIsPlaying(false);
      onUpdatePetIndicator(hunger, "hunger");
    }
  }, [hunger, isPlaying, onUpdatePetIndicator]);

  useEffect(() => {
    if (isPlaying && !gameEnded) {
      const timeInterval = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        setGameTime(timeElapsed);
      }, 1000);

      return () => clearInterval(timeInterval);
    }
  }, [isPlaying, gameEnded, startTime]);

  if (gameEnded) {
    return <SummaryScreen itemsCaught={counter} timeTaken={gameTime} />;
  }

  return (
    <MainPage>
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
          <AvatarContainer>
            <PlayerAvatar x={avatarX} picture={activePet.picture} />
          </AvatarContainer>
        </GameFieldContainer>
        <Counter>Items caught: {counter}</Counter>
        <ButtonContainer>
          <LeftButton
            onClick={() => moveAvatar(-15)}
            disabled={!isPlaying || gameEnded}
          >
            Left
          </LeftButton>
          <RightButton
            onClick={() => moveAvatar(15)}
            disabled={!isPlaying || gameEnded}
          >
            Right
          </RightButton>
        </ButtonContainer>
        <ButtonContainer>
          <Link href="/garden">
            <BackButton>Back</BackButton>
          </Link>
          {!isPlaying && <PlayButton onClick={startGame}>Play</PlayButton>}
        </ButtonContainer>
      </Container>
    </MainPage>
  );
}
