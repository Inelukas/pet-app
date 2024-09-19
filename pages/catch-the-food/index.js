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
import Popup from "@/components/Popup/Popup";
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
  achievements,
  onUpdateAchievements,
  totalPoints,
  onTotalPoints,
}) {
  const [gameStates, setGameStates] = useState({
    gameOn: false,
    avatarX: 180,
    items: [],
    counter: 0,
    gameTime: 0,
    startTime: null,
    score: 0,
    hunger: activePet?.status.hunger,
    instructions: false,
    gameWidth: 270,
    gameHeight: 400,
    unlockedAchievement: null,
    showPopup: false,
  });
  useEffect(() => {
    if (gameStates.showPopup) {
      const timer = setTimeout(() => {
        setGameStates((prevValues) => ({
          ...prevValues,
          showPopup: false,
        }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameStates.showPopup]);
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
  useEffect(() => {
    if (gameStates.counter > 0) {
      onTotalPoints("catchfood");
    }
  }, [gameStates.counter]);
  useEffect(() => {
    if (gameStates.counter > 0) {
      handleAchievementUpdate();
    }
  }, [gameStates.counter, totalPoints.catchfood]);

  function handleAchievementUpdate() {
    let achievementUnlocked = false;
    if (gameStates.counter >= 5 && !achievements.furniture[2]) {
      onUpdateAchievements("furniture", 2);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Pet Castle unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
    if (gameStates.counter >= 8 && !achievements.furniture[3]) {
      onUpdateAchievements("furniture", 3);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Litter Box Throne unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
    if (totalPoints.catchfood >= 12 && !achievements.food[2]) {
      onUpdateAchievements("food", 2);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Sandwich unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
    if (totalPoints.catchfood >= 20 && !achievements.food[3]) {
      onUpdateAchievements("food", 3);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Burger unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
  }
  function startGame() {
    if (!gameStates.gameOn) {
      setGameStates((prevValues) => ({
        ...prevValues,
        gameOn: true,
        gameTime: 0,
        counter: 0,
        items: [],
        startTime: Date.now(),
        hunger: activePet?.status.hunger,
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
      }, 200 + 1000 * onSpeedFactor(activePet?.characteristics));
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
                  hunger:
                    item.type === "good"
                      ? prevState.hunger - 5
                      : prevState.hunger + 5,
                }));
                return false;
              }
              if (item.y >= gameStates.gameHeight - 30) return false;
              return true;
            }),
        }));
      }, 20 + 30 * onSpeedFactor(activePet?.characteristics));
    }
    return () => clearInterval(interval);
  }, [gameStates.gameOn, gameStates.gameHeight]);
  useEffect(() => {
    if (gameStates.hunger <= 0) {
      setGameStates((prevValues) => ({
        ...prevValues,
        gameOn: false,
      }));
      onUpdatePetIndicator(gameStates.counter, "hunger");
    }
  }, [gameStates.hunger]);

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
  if (!gameStates.gameOn && gameStates.hunger <= 0) {
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
      {gameStates.showPopup && (
        <Popup message={gameStates.unlockedAchievement} />
      )}
      {gameStates.instructions && (
        <Filter onClick={() => toggleInstructions(setGameStates)}></Filter>
      )}
      <StyledTitle>Catch The Food</StyledTitle>
      <GameFieldContainer>
        <StyledIndicatorContainer>
          <Indicator
            data={{
              name: "hunger",
              count: gameStates.hunger,
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
            picture={activePet?.picture}
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
