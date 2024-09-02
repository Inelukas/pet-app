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

// const StyledButton = styled.button`
//   display: grid;
//   place-content: center;
//   width: 80px;
//   height: 50px;
//   background: lightgreen;
//   border-radius: 20px;
//   border: none;
//   opacity: ${(props) => (props.disabled ? "0.5" : "1")};
// `;

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

export default function SnakeGame({ pet }) {
  const [gameOn, setGameOn] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 140, y: 140 });
  const [children, setChildren] = useState([]);
  const [foodPosition, setFoodPosition] = useState({});
  const [direction, setDirection] = useState("");
  const [prevDirection, setPrevDirection] = useState("");
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

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

        setPrevDirection(direction);

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

        function checkGameLost() {
          if (
            playerPosition.x < 0 ||
            playerPosition.x > 260 ||
            playerPosition.y < 0 ||
            playerPosition.y > 260 ||
            children.some((child) => {
              if (
                playerPosition.x === child.x &&
                playerPosition.y === child.y
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

        checkGameLost();

        if (checkGameLost()) {
          return prevPosition;
        }
        moveChildren();
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
            showBar={false}
            data={{ name: "happiness", count: 80 + score }}
          />
        </StyledIndicatorContainer>
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
        <ConfirmButton onClick={newGame} disabled={gameOn}>
          Play Again
        </ConfirmButton>
      </StyledButtonContainer>
    </StyledSnakePage>
  );
}
