import Indicator from "@/components/Indicator/Indicator";
import PetChild from "@/components/GameElements/Snake/PetChild/PetChild";
import Food from "@/components/GameElements/Snake/Food/Food";
import Player from "@/components/GameElements/Snake/Player/Player";
import { useEffect, useState } from "react";
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
import SummaryScreen from "@/components/GameElements/SummaryScreen/SummaryScreen";
import toggleInstructions from "@/utils/toggleInstructions";
import Popup from "@/components/Popup/Popup";

export default function SnakeGame({
  onUpdatePetIndicator,
  activePet,
  onSpeedFactor,
  achievements,
  onUpdateAchievements,
  totalPoints,
  onTotalPoints,
}) {
  const [gameStates, setGameStates] = useState({
    gameOn: true,
    playerPosition: { x: 140, y: 140 },
    children: [],
    foodPosition: {},
    direction: "",
    prevDirection: "",
    score: 0,
    highscore: 0,
    instructions: false,
    gameWidth: 300,
    gameHeight: 300,
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
            ? 440
            : window.innerWidth >= 600
            ? 360
            : 300,
        gameHeight:
          window.innerWidth >= 1200
            ? 440
            : window.innerWidth >= 600
            ? 360
            : 300,
        foodPosition: generateNewFoodPosition(),
      }));
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setGameStates((prevValues) => {
      return { ...prevValues, foodPosition: generateNewFoodPosition() };
    });
  }, []);

  useEffect(() => {
    if (!gameStates.gameOn) {
      const itemSound = new Audio("/assets/music/fail.mp3");
      itemSound.volume = 0.05;
      itemSound.play();
      onUpdatePetIndicator(gameStates.score, "Happiness");
    }
  }, [gameStates.gameOn]);

  useEffect(() => {
    if (gameStates.score) {
      onTotalPoints("snake");
      handleAchievementUpdate();
    }
  }, [gameStates.score]);

  useEffect(() => {
    handleAchievementUpdate();
  }, [gameStates.score, totalPoints]);

  function handleAchievementUpdate() {
    let achievementUnlocked = false;

    if (gameStates.score >= 5 && !achievements.play[1]) {
      onUpdateAchievements("play", 1);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Ball unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
    if (gameStates.score >= 8 && !achievements.play[2]) {
      onUpdateAchievements("play", 2);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Yarn unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }

    if (totalPoints.snake >= 12 && !achievements.food[0]) {
      onUpdateAchievements("food", 0);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Broccoli unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
    if (totalPoints.snake >= 20 && !achievements.food[1]) {
      onUpdateAchievements("food", 1);
      setGameStates((prevValues) => ({
        ...prevValues,
        unlockedAchievement: "Ham unlocked!",
        showPopup: true,
      }));
      achievementUnlocked = true;
    }
  }

  useEffect(() => {
    function movePlayer() {
      if (!gameStates.gameOn) return;
      setGameStates((prevValues) => {
        let prevPlayerPosition = { ...prevValues.playerPosition };
        let newPosition = { ...prevValues.playerPosition };
        let newFoodPosition;
        if (prevValues.direction === "ArrowUp") {
          newPosition.y -= 20;
        } else if (prevValues.direction === "ArrowDown") {
          newPosition.y += 20;
        } else if (prevValues.direction === "ArrowLeft") {
          newPosition.x -= 20;
        } else if (prevValues.direction === "ArrowRight") {
          newPosition.x += 20;
        }

        function setNewValues(prevValues) {
          if (
            newPosition.x === prevValues.foodPosition.x &&
            newPosition.y === prevValues.foodPosition.y
          ) {
            const itemSound = new Audio("/assets/music/item.mp3");
            itemSound.volume = 0.05;
            itemSound.play();
            newFoodPosition = generateNewFoodPosition();
            while (checkNewFoodOverlap(newFoodPosition)) {
              newFoodPosition = generateNewFoodPosition();
            }
          }

          if (checkGameLost(newPosition, prevValues.children)) {
            return { playerPosition: prevValues.playerPosition, gameOn: false };
          }
          moveChildren(prevPlayerPosition);
          return {
            playerPosition: newPosition,
            prevDirection: prevValues.direction,
            foodPosition: newFoodPosition
              ? newFoodPosition
              : prevValues.foodPosition,
            score: newFoodPosition ? prevValues.score + 1 : prevValues.score,
            highscore:
              prevValues.score > prevValues.highscore
                ? prevValues.score
                : prevValues.highscore,
            children: newFoodPosition
              ? [
                  ...prevValues.children,
                  {
                    x: prevValues.playerPosition.x,
                    y: prevValues.playerPosition.y,
                  },
                ]
              : prevValues.children,
          };
        }

        return { ...prevValues, ...setNewValues(prevValues) };
      });
    }

    const moveInterval = setInterval(
      movePlayer,
      100 * onSpeedFactor(activePet?.characteristics) + 50
    );
    return () => clearInterval(moveInterval);
  }, [
    gameStates.direction,
    gameStates.playerPosition,
    gameStates.foodPosition,
  ]);

  function handleDirection(event) {
    const currentKey = typeof event === "string" ? event : event.key;

    if (currentKey === "ArrowUp" && gameStates.prevDirection !== "ArrowDown") {
      setGameStates((prevVal) => ({ ...prevVal, direction: "ArrowUp" }));
    } else if (
      currentKey === "ArrowDown" &&
      gameStates.prevDirection !== "ArrowUp"
    ) {
      setGameStates((prevVal) => ({
        ...prevVal,
        direction: "ArrowDown",
      }));
    } else if (
      currentKey === "ArrowLeft" &&
      gameStates.prevDirection !== "ArrowRight"
    ) {
      setGameStates((prevVal) => ({
        ...prevVal,
        direction: "ArrowLeft",
      }));
    } else if (
      currentKey === "ArrowRight" &&
      gameStates.prevDirection !== "ArrowLeft"
    ) {
      setGameStates((prevVal) => ({
        ...prevVal,
        direction: "ArrowRight",
      }));
    }
  }

  function generateNewFoodPosition() {
    return {
      x: Math.floor(Math.random() * ((gameStates.gameWidth - 20) / 20)) * 20,
      y: Math.floor(Math.random() * ((gameStates.gameHeight - 20) / 20)) * 20,
    };
  }

  function handleNewGame() {
    setGameStates((prevVal) => {
      return {
        ...prevVal,
        gameOn: true,
        playerPosition: { x: 140, y: 140 },
        children: [],
        foodPosition: generateNewFoodPosition(),
        direction: "",
        prevDirection: "",
        score: 0,
      };
    });
  }

  function checkGameLost(newPlayerPosition, children) {
    if (
      newPlayerPosition.x < 0 ||
      newPlayerPosition.x >= gameStates.gameWidth - 20 ||
      newPlayerPosition.y < 0 ||
      newPlayerPosition.y >= gameStates.gameHeight - 20 ||
      children.some((child) => {
        if (
          newPlayerPosition.x === child.x &&
          newPlayerPosition.y === child.y
        ) {
          return true;
        }
      })
    ) {
      setGameStates((prevVal) => ({ ...prevVal, gameOn: false }));
      return true;
    }
    return false;
  }

  function checkNewFoodOverlap(food) {
    if (
      (food.x === gameStates.foodPosition.x &&
        food.y === gameStates.foodPosition.y) ||
      (food.x === gameStates.playerPosition.x &&
        food.y === gameStates.playerPosition.y) ||
      gameStates.children.some((child) => {
        if (food.x === child.x && food.y === child.y) {
          return true;
        }
      })
    ) {
      return true;
    }
    return false;
  }

  function moveChildren(prevPlayerPosition) {
    setGameStates((prevValues) => {
      const newChildren = prevValues.children.map((child, index) => {
        if (index === 0) {
          return { ...prevPlayerPosition };
        } else {
          return { ...prevValues.children[index - 1] };
        }
      });
      return { ...prevValues, children: newChildren };
    });
  }

<<<<<<< HEAD
  if (!gameStates.gameOn && activePet.status.Happiness === 100) {
=======
  if (!gameStates.gameOn && activePet?.status.happiness === 100) {
>>>>>>> main
    return <SummaryScreen itemsCaught={gameStates.score} snake={true} />;
  }

  return (
    <StyledGamePage>
      {gameStates.showPopup && (
        <Popup message={gameStates.unlockedAchievement} />
      )}
      {gameStates.instructions && (
        <Filter onClick={() => toggleInstructions(setGameStates)}></Filter>
      )}
      <StyledTitle>Happy Family Game</StyledTitle>
      <StyledGameField>
        <Player
          onDirection={handleDirection}
          playerPosition={gameStates.playerPosition}
          gameOn={gameStates.gameOn}
          pet={activePet}
        />
        <Food foodPosition={gameStates.foodPosition} pet={activePet} />
        {gameStates.children &&
          gameStates.children.map((child, index) => (
            <PetChild
              key={index}
              childPosition={child}
              gameOn={gameStates.gameOn}
              pet={activePet}
            />
          ))}
        <StyledIndicatorContainer>
          <Indicator
            showBarName={false}
            data={{
              name: "Happiness",
              count: gameStates.gameOn
                ? Math.min(
<<<<<<< HEAD
                    activePet.status.Happiness + gameStates.score * 5,
                    100
                  )
                : activePet.status.Happiness,
=======
                    activePet?.status.happiness + gameStates.score * 5,
                    100
                  )
                : activePet?.status.happiness,
>>>>>>> main
            }}
          />
        </StyledIndicatorContainer>
        <ScoreContainer
          score={gameStates.score}
          highscore={gameStates.highscore}
        />
        {gameStates.instructions && <HowToPlay game="snake" />}
      </StyledGameField>
      <ButtonContainer
        onDirection={handleDirection}
        gameOn={gameStates.gameOn}
        instructions={gameStates.instructions}
        onInstructions={() => toggleInstructions(setGameStates)}
        onNewGame={handleNewGame}
        snake={true}
      />
    </StyledGamePage>
  );
}
