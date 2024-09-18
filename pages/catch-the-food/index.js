import styled from "styled-components";
import { useState, useEffect } from "react";
import PlayerAvatar from "@/components/GameElements/CatchFood/PlayerAvatar/PlayerAvatar";
import FallingBlocks from "@/components/GameElements/CatchFood/FallingBlocks/FallingBlocks";
import SummaryScreen from "@/components/GameElements/SummaryScreen/SummaryScreen";
import Indicator from "@/components/Indicator/Indicator";
import { uid } from "uid";
import {
  Filter,
  HowToPlay,
  StyledGameField,
  StyledGamePage,
  StyledIndicatorContainer,
  StyledTitle,
} from "@/components/GameElements/GameElements";
import ButtonContainer from "@/components/GameElements/ButtonContainer/ButtonContainer";
import ScoreContainer from "@/components/GameElements/ScoreContainer/ScoreContainer";
import toggleInstructions from "@/utils/toggleInstructions";

const GameFieldContainer = styled(StyledGameField)`
  display: flex;
  place-content: unset;
  width: 270px;
  min-height: 400px;
  border: 4px solid black;
  box-sizing: border-box;

  @media screen and (min-width: 600px) {
    width: 324px;
    min-height: 480px;
  }
  @media screen and (min-width: 1200px) {
    width: 378px;
    min-height: 560px;
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 0px;
`;

const getRandomItem = (gameWidth) => {
  const items = [
    { type: "good", name: "Broccoli", icon: "🥦" },
    { type: "good", name: "Carrot", icon: "🥕" },
    { type: "good", name: "Banana", icon: "🍌" },
    { type: "good", name: "Hamburger", icon: "🍔" },
    { type: "bad", name: "Oildrum", icon: "🛢️" },
    { type: "bad", name: "Toilet", icon: "🚽" },
    { type: "bad", name: "Pool 8 Ball", icon: "🎱" },
  ];

  const randomX = Math.floor(Math.random() * (gameWidth - 40));

  return {
    ...items[Math.floor(Math.random() * items.length)],
    x: randomX,
    y: 0,
    id: uid(),
  };
};

export default function GamePage({
  activePet,
  onUpdatePetIndicator,
  onSpeedFactor,
}) {
  const [gameStates, setGameStates] = useState({
    gameOn: false,
    avatarX: 180,
    items: [],
    counter: 0,
    gameTime: 0,
    startTime: null,
    score: 0,
    Hunger: activePet.status.Hunger,
    instructions: false,
    gameWidth: 270,
    gameHeight: 400,
  });

  useEffect(() => {
    const handleResize = () => {
      setGameStates((prevValues) => ({
        ...prevValues,
        gameWidth:
          window.innerWidth >= 1200
            ? 378
            : window.innerWidth >= 600
            ? 324
            : 270,
        gameHeight:
          window.innerWidth >= 1200
            ? 560
            : window.innerWidth >= 600
            ? 480
            : 400,
      }));
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function startGame() {
    if (!gameStates.gameOn) {
      setGameStates((prevValues) => ({
        ...prevValues,
        gameOn: true,
        gameTime: 0,
        counter: 0,
        items: [],
        startTime: Date.now(),
        Hunger: activePet.status.Hunger,
      }));
    }
  }

  useEffect(() => {
    if (gameStates.gameOn) {
      const interval = setInterval(() => {
        setGameStates((prevValues) => ({
          ...prevValues,
          items: [...prevValues.items, getRandomItem(gameStates.gameWidth)],
        }));
      }, 200 + 1000 * onSpeedFactor(activePet.characteristics));
      return () => clearInterval(interval);
    }
  }, [gameStates.gameOn, gameStates.gameWidth]);

  function handleDirection(event) {
    const currentKey = typeof event === "string" ? event : event.key;

    if (currentKey === "ArrowLeft") {
      moveAvatar(-15);
    } else if (currentKey === "ArrowRight") {
      moveAvatar(15);
    }
  }

  function moveAvatar(moveAmount) {
    setGameStates((prevValues) => ({
      ...prevValues,
      avatarX: Math.max(
        0,
        Math.min(gameStates.gameWidth - 40, prevValues.avatarX + moveAmount)
      ),
    }));
  }

  useEffect(() => {
    let interval;

    if (gameStates.gameOn) {
      interval = setInterval(() => {
        setGameStates((prevValues) => ({
          ...prevValues,
          items: prevValues.items
            .map((item) => ({
              ...item,
              y: item.y + 5,
            }))
            .filter((item) => {
              const isCaught =
                item.y >= gameStates.gameHeight - 60 &&
                Math.abs(item.x - prevValues.avatarX) < 20;

              if (isCaught) {
                if (item.type === "good") {
                  const itemSound = new Audio("/assets/music/item.mp3");
                  itemSound.volume = 0.05;
                  itemSound.play();
                } else if (item.type === "bad") {
                  const itemSound = new Audio("/assets/music/fail.mp3");
                  itemSound.volume = 0.05;
                  itemSound.play();
                }
                setGameStates((prevState) => ({
                  ...prevState,
                  counter: prevState.counter + 1,
                  Hunger:
                    item.type === "good"
                      ? prevState.Hunger - 5
                      : prevState.Hunger + 5,
                }));
                return false;
              }

              if (item.y >= gameStates.gameHeight - 30) return false;
              return true;
            }),
        }));
      }, 20 + 30 * onSpeedFactor(activePet.characteristics));
    }

    return () => clearInterval(interval);
  }, [gameStates.gameOn, gameStates.gameHeight]);

  useEffect(() => {
    if (gameStates.gameOn && gameStates.Hunger <= 0) {
      setGameStates((prevValues) => ({
        ...prevValues,
        gameOn: false,
      }));
      onUpdatePetIndicator(0, "Hunger");
    }
  }, [gameStates.Hunger, gameStates.gameOn, onUpdatePetIndicator]);

  useEffect(() => {
    if (gameStates.gameOn) {
      const timeInterval = setInterval(() => {
        const timeElapsed = Math.floor(
          (Date.now() - gameStates.startTime) / 1000
        );
        setGameStates((prevValues) => ({
          ...prevValues,
          gameTime: timeElapsed,
        }));
      }, 1000);

      return () => clearInterval(timeInterval);
    }
  }, [gameStates.gameOn, gameStates.startTime]);

  if (!gameStates.gameOn && gameStates.Hunger <= 0) {
    return (
      <SummaryScreen
        itemsCaught={gameStates.counter}
        timeTaken={gameStates.gameTime}
        catchfood={true}
      />
    );
  }

  return (
    <StyledGamePage>
      {gameStates.instructions && (
        <Filter onClick={() => toggleInstructions(setGameStates)}></Filter>
      )}
      <StyledTitle>Catch The Food</StyledTitle>

      <GameFieldContainer>
        <StyledIndicatorContainer>
          <Indicator
            data={{
              name: "Hunger",
              count: gameStates.Hunger,
            }}
            showBarName={false}
          />
        </StyledIndicatorContainer>
        {gameStates.items.map((item) => (
          <FallingBlocks key={item.id} item={item} />
        ))}
        <AvatarContainer>
          <PlayerAvatar
            x={gameStates.avatarX}
            picture={activePet.picture}
            onDirection={handleDirection}
          />
        </AvatarContainer>
        <ScoreContainer score={gameStates.counter} catchfood={true} />
        {gameStates.instructions && <HowToPlay game="catchfood" />}
      </GameFieldContainer>
      <ButtonContainer
        score={gameStates.counter}
        hide={true}
        gameOn={gameStates.gameOn}
        onReset={startGame}
        onDirection={handleDirection}
        onStart={startGame}
        onInstructions={() => toggleInstructions(setGameStates)}
      />
    </StyledGamePage>
  );
}
