import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import Indicator from "@/components/Indicator/Indicator";
import ArrowButtons from "@/components/SnakeGame/ArrowButtons/ArrowButtons";
import Child from "@/components/SnakeGame/Child/Child";
import Food from "@/components/SnakeGame/Food/Food";
import Player from "@/components/SnakeGame/Player/Player";
import StyledLink from "@/components/StyledLink/StyledLink";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSnakePage = styled.main`
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

const StyledGameField = styled.div`
  display: grid;
  place-content: center;
  width: 300px;
  height: 300px;
  background: lightgreen;
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

const StyledScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  font-size: 1.2rem;
  font-weight: 800;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 100px;
`;

const StyledIndicatorContainer = styled.div`
  position: absolute;
  left: -175px;
  top: 20vh;

  @media screen and (min-width: 600px) {
    left: -200px;
  }

  h3 {
    rotate: calc(90deg);
  }

  article {
    rotate: calc(270deg);
    width: 300px;
    justify-content: center;
  }
`;

const StyledGameOver = styled.h1`
  position: absolute;
  bottom: 25vh;
`;

const StyledHowToPlay = styled.div`
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

export default function SnakeGame({ pet }) {
  const [gameOn, setGameOn] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 140, y: 140 });
  const [children, setChildren] = useState([]);
  const [foodPosition, setFoodPosition] = useState({});
  const [direction, setDirection] = useState("");
  const [prevDirection, setPrevDirection] = useState("");
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [instructions, setInstructions] = useState(false);

  useEffect(() => {
    setFoodPosition(generateNewFoodPosition());
  }, []);

  useEffect(() => {
    function movePlayer() {
      if (!gameOn) return;
      setPlayerPosition((prevPosition) => {
        let newPosition = { ...prevPosition };

        if (direction === "ArrowUp") {
          newPosition.y -= 20;
        } else if (direction === "ArrowDown") {
          newPosition.y += 20;
        } else if (direction === "ArrowLeft") {
          newPosition.x -= 20;
        } else if (direction === "ArrowRight") {
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
          setScore(score + 1);
          if (score >= highscore) {
            setHighscore(score + 1);
          }

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
        setPrevDirection(direction);
        return newPosition;
      });
    }

    const moveInterval = setInterval(movePlayer, 100);
    return () => clearInterval(moveInterval);
  }, [direction, playerPosition, foodPosition]);

  function handleDirection(event) {
    const currentKey = typeof event === "string" ? event : event.key;

    if (currentKey === "ArrowUp" && prevDirection !== "ArrowDown") {
      setDirection("ArrowUp");
    } else if (currentKey === "ArrowDown" && prevDirection !== "ArrowUp") {
      setDirection("ArrowDown");
    } else if (currentKey === "ArrowLeft" && prevDirection !== "ArrowRight") {
      setDirection("ArrowLeft");
    } else if (currentKey === "ArrowRight" && prevDirection !== "ArrowLeft") {
      setDirection("ArrowRight");
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
    setDirection("");
    setPrevDirection("");
    setScore(0);
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
          pet={pet}
        />
        <Food foodPosition={foodPosition} pet={pet} />
        {children
          ? children.map((child, index) => (
              <Child
                key={index}
                childPosition={child}
                gameOn={gameOn}
                pet={pet}
              />
            ))
          : null}
        <StyledIndicatorContainer>
          <Indicator
            showBarName={false}
            data={{ name: "happiness", count: score < 10 ? 90 + score : 100 }}
          />
        </StyledIndicatorContainer>
        {instructions ? (
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
                animal's happiness bar.{" "}
              </li>{" "}
              <li>Try to have a family of more than 100 children!</li>
            </ul>
          </StyledHowToPlay>
        ) : null}
      </StyledGameField>
      <StyledScoreContainer>
        <span>Current Score: {score}</span>
        <span>Highscore: {highscore}</span>
      </StyledScoreContainer>
      {!gameOn ? (
        <StyledGameOver>Game Over</StyledGameOver>
      ) : (
        <ArrowButtons onDirection={handleDirection} />
      )}
      <StyledButtonContainer>
        <StyledLink href="/">Back </StyledLink>
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
    </StyledSnakePage>
  );
}
