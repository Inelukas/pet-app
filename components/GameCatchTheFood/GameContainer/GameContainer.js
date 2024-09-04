import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import FallingBlocks from "../FallingBlocks/FallingBlocks";
import SummaryScreen from "../SummaryScreen/SummaryScreen";
import { uid } from "uid";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
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

const GameFieldContainer = styled.div`
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
`;

const RightButton = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  cursor: pointer;
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

export default function GameContainer() {
  const [items, setItems] = useState([]);
  const [avatarX, setAvatarX] = useState(180);
  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setGameTime(0);
    setCounter(0);
    setItems([]);
    setGameEnded(false);
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
    setAvatarX((prevX) => Math.max(0, Math.min(360, prevX + direction)));
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

  useEffect(() => {
    if (isPlaying && !gameEnded) {
      const interval = setInterval(() => {
        setItems((prevItems) =>
          prevItems
            .map((item) => ({
              ...item,
              y: item.y + 5,
            }))
            .filter((item) => {
              const isCaught = item.y >= 570 && Math.abs(item.x - avatarX) < 40;
              if (isCaught) {
                if (item.type === "good") {
                  setCounter((prev) => Math.min(10, prev + 0.5));
                } else if (item.type === "bad") {
                  setCounter((prev) => Math.max(0, prev - 0.5));
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
  }, [isPlaying, gameEnded, avatarX]);

  useEffect(() => {
    if (counter >= 10) {
      setGameEnded(true);
      setIsPlaying(false);
    }
  }, [counter]);

  if (gameEnded) {
    return <SummaryScreen itemsCaught={counter} timeTaken={gameTime} />;
  }

  return (
    <Wrapper>
      <Container>
        <GameFieldContainer>
          {items.map((item) => (
            <FallingBlocks key={item.id} item={item} />
          ))}
          <PlayerAvatar x={avatarX} />
        </GameFieldContainer>
        <Counter>Score: {counter}</Counter>
        <div>
          <LeftButton onClick={() => moveAvatar(-10)}>Left</LeftButton>
          <RightButton onClick={() => moveAvatar(10)}>Right</RightButton>
        </div>
        {!isPlaying && <PlayButton onClick={startGame}>Play</PlayButton>}
      </Container>
    </Wrapper>
  );
}
