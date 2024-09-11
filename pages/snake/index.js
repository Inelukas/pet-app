import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import Indicator from "@/components/Indicator/Indicator";
import ArrowButtons from "@/components/SnakeGame/ArrowButtons/ArrowButtons";
import PetChild from "@/components/SnakeGame/PetChild/PetChild";
import Food from "@/components/SnakeGame/Food/Food";
import Player from "@/components/SnakeGame/Player/Player";
import StyledLink from "@/components/StyledLink/StyledLink";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const StyledSnakePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100vw;
  height: 100vh;
  background: #f1f3c2;
  @media screen and (min-width: 600px) {
    gap: 5vh;
  }
  @media screen and (min-width: 900px) {
    gap: 10vh;
  }
`;

export const StyledGameField = styled.div`
  display: grid;
  place-content: center;
  width: 300px;
  min-height: 300px;
  background: #008000;
  background-image: url("https://www.transparenttextures.com/patterns/checkered-light-emboss.png");
  border: 2px solid #000000;
  border-radius: 20px;
  position: relative;
  border: 5px solid #000000;
  @media screen and (min-width: 600px) {
    transform: scale(1.2);
  }
  @media screen and (min-width: 900px) {
    transform: scale(1.5);
  }
`;

export const StyledScoreAndButtonContainer = styled.section`
  position: relative;
`;

export const StyledScoreContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  font-size: 1.2rem;
  font-weight: 800;
`;

export const StyledButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 10vh;
`;

export const StyledIndicatorContainer = styled.section`
  position: absolute;
  left: -175px;
  top: 60px;
  transform: rotate(270deg);
  width: 300px;

  @media screen and (min-width: 600px) {
    left: -200px;
  }
`;

const StyledGameOver = styled.h1`
  position: absolute;
  top: 30%;
  left: 25%;
`;

export const StyledHowToPlay = styled.div`
  display: grid;
  place-content: center;
  gap: 20px;
  background: var(--secondary-color);
  font-size: 0.8rem;
  line-height: 2;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  top: -20px;
  z-index: 2;
  @media screen and (min-width: 900px) {
    display: block;
    width: 120px;
    right: -140px;
    top: 20px;
    font-size: 0.6rem;
    background: none;
    padding: 0;
    line-height: 1.5;
  }
  @media screen and (min-width: 1200px) {
    width: 200px;
    font-size: 0.8rem;
    right: -230px;
  }
`;

export default function SnakeGame({ onUpdatePetIndicator, activePet }) {
  const [gameOn, setGameOn] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 140, y: 140 });
  const [children, setChildren] = useState([]);
  const [foodPosition, setFoodPosition] = useState({});
  const [directions, setDirections] = useState({
    currentDirection: "",
    prevDirection: "",
  });
  const [scores, setScores] = useState({ score: 0, highscore: 0 });
  const [instructions, setInstructions] = useState(false);

  useEffect(() => {
    setFoodPosition(generateNewFoodPosition());
  }, []);

  useEffect(() => {
    if (!gameOn) {
      const newHappinessValue = Math.min(
        activePet.status.happiness + scores.score,
        100
      );
      onUpdatePetIndicator(newHappinessValue, "happiness");
    }
  }, [gameOn]);

  useEffect(() => {
    function movePlayer() {
      if (!gameOn) return;
      setPlayerPosition((prevPosition) => {
        let newPosition = { ...prevPosition };

        if (directions.direction === "ArrowUp") {
          newPosition.y -= 20;
        } else if (directions.direction === "ArrowDown") {
          newPosition.y += 20;
        } else if (directions.direction === "ArrowLeft") {
          newPosition.x -= 20;
        } else if (directions.direction === "ArrowRight") {
          newPosition.x += 20;
        }

        if (
          newPosition.x === foodPosition.x &&
          newPosition.y === foodPosition.y
        ) {
          let newFoodPosition = generateNewFoodPosition();
          while (checkNewFoodOverlap(newFoodPosition)) {
            newFoodPosition = generateNewFoodPosition();
          }
          setFoodPosition(newFoodPosition);
          setScores(() => ({
            score: scores.score + 1,
            highscore:
              scores.score >= scores.highscore
                ? scores.highscore + 1
                : scores.highscore,
          }));

          setChildren((prevChildren) => [
            ...prevChildren,
            { x: prevPosition.x, y: prevPosition.y },
          ]);
        }

        if (checkGameLost(newPosition, children)) {
          setGameOn(false);
          return prevPosition;
        }
        moveChildren();
        setDirections((prevVal) => ({
          ...prevVal,
          prevDirection: prevVal.direction,
        }));
        return newPosition;
      });
    }

    const moveInterval = setInterval(movePlayer, 100);
    return () => clearInterval(moveInterval);
  }, [directions, playerPosition, foodPosition]);

  function handleDirection(event) {
    const currentKey = typeof event === "string" ? event : event.key;

    if (currentKey === "ArrowUp" && directions.prevDirection !== "ArrowDown") {
      setDirections((prevVal) => ({ ...prevVal, direction: "ArrowUp" }));
    } else if (
      currentKey === "ArrowDown" &&
      directions.prevDirection !== "ArrowUp"
    ) {
      setDirections((prevVal) => ({ ...prevVal, direction: "ArrowDown" }));
    } else if (
      currentKey === "ArrowLeft" &&
      directions.prevDirection !== "ArrowRight"
    ) {
      setDirections((prevVal) => ({ ...prevVal, direction: "ArrowLeft" }));
    } else if (
      currentKey === "ArrowRight" &&
      directions.prevDirection !== "ArrowLeft"
    ) {
      setDirections((prevVal) => ({ ...prevVal, direction: "ArrowRight" }));
    }
  }

  function generateNewFoodPosition() {
    return {
      x: Math.floor(Math.random() * 14) * 20,
      y: Math.floor(Math.random() * 14) * 20,
    };
  }

  function newGame() {
    setPlayerPosition({ x: 140, y: 140 });
    setDirections({ direction: "", prevDirection: "" });
    setScores((prevVal) => ({ ...prevVal, score: 0 }));
    setFoodPosition(generateNewFoodPosition);
    setChildren([]);
    setGameOn(true);
  }

  function checkGameLost(newPlayerPosition, children) {
    if (
      newPlayerPosition.x < 0 ||
      newPlayerPosition.x > 260 ||
      newPlayerPosition.y < 0 ||
      newPlayerPosition.y > 260 ||
      children.some((child) => {
        if (
          newPlayerPosition.x === child.x &&
          newPlayerPosition.y === child.y
        ) {
          return true;
        }
      })
    ) {
      setGameOn(false);
      return true;
    }
    return false;
  }

  function checkNewFoodOverlap(food) {
    if (
      (food.x === foodPosition.x && food.y === foodPosition.y) ||
      (food.x === playerPosition.x && food.y === playerPosition.y) ||
      children.some((child) => {
        if (food.x === child.x && food.y === child.y) {
          return true;
        }
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  function moveChildren() {
    setChildren((prevChildren) => {
      const newChildren = prevChildren.map((child, index) => {
        if (index === 0) {
          return { ...playerPosition };
        } else {
          return { ...prevChildren[index - 1] };
        }
      });

      return newChildren;
    });
  }

  return (
    <StyledSnakePage>
      <h1>Happy Family Game</h1>
      <StyledGameField>
        <Player
          onDirection={handleDirection}
          playerPosition={playerPosition}
          gameOn={gameOn}
          pet={activePet}
        />
        <Food foodPosition={foodPosition} pet={activePet} />
        {children &&
          children.map((child, index) => (
            <PetChild
              key={index}
              childPosition={child}
              gameOn={gameOn}
              pet={activePet}
            />
          ))}
        <StyledIndicatorContainer>
          <Indicator
            showBarName={false}
            data={{
              name: "happiness",
              count: gameOn
                ? Math.min(activePet.status.happiness + scores.score, 100)
                : activePet.status.happiness,
            }}
          />
        </StyledIndicatorContainer>
        {instructions && (
          <StyledHowToPlay>
            <h2>How To Play</h2>
            <ul>
              <li>
                {" "}
                Use the arrow keys or the on-screen buttons to move your animal.{" "}
              </li>{" "}
              <li>
                {" "}
                Collect the small animals on the screen; a child will be added
                to your animal.{" "}
              </li>{" "}
              <li>
                {" "}
                Build a big capybara family without touching the walls or
                running over your children.{" "}
              </li>{" "}
              <li>
                {" "}
                More children = more happiness! Each child adds +1 to your
                animal&apos;s happiness bar.{" "}
              </li>{" "}
              <li>Try to have a family of more than 100 children!</li>
            </ul>
          </StyledHowToPlay>
        )}
      </StyledGameField>
      <StyledScoreAndButtonContainer>
        <StyledScoreContainer>
          <span>Current Score: {scores.score}</span>
          <span>Highscore: {scores.highscore}</span>
        </StyledScoreContainer>
        {!gameOn ? (
          <StyledGameOver>Game Over</StyledGameOver>
        ) : (
          <ArrowButtons onDirection={handleDirection} />
        )}
        <StyledButtonContainer>
          <StyledLink href="/garden">Back </StyledLink>
          <ConfirmButton
            onClick={
              gameOn
                ? () => {
                    setInstructions(!instructions);
                  }
                : newGame
            }
          >
            {gameOn ? "Instructions" : "Play Again"}
          </ConfirmButton>
        </StyledButtonContainer>
      </StyledScoreAndButtonContainer>
    </StyledSnakePage>
  );
}
