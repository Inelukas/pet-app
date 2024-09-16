import { useState, useEffect } from "react";
import styled from "styled-components";
import Indicator from "@/components/Indicator/Indicator";
import {
  StyledGameField,
  StyledGamePage,
  StyledIndicatorContainer,
  StyledTitle,
  HowToPlay,
  Filter,
} from "@/components/GameElements/GameElements";
import ButtonContainer from "../../components/GameElements/ButtonContainer/ButtonContainer";
import ScoreContainer from "@/components/GameElements/ScoreContainer/ScoreContainer";
import SummaryScreen from "@/components/GameElements/SummaryScreen/SummaryScreen";
import toggleInstructions from "@/utils/toggleInstructions";

const StyledTappingGameField = styled(StyledGameField)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;

  min-height: 375px;
  padding: 10px;
  box-sizing: border-box;
`;

const TappingCircle = styled.button`
  background-image: ${({ $isActive, $isWrongActive }) =>
    $isWrongActive
      ? `url("/images/ghost.png")`
      : $isActive
      ? `url("/images/capybara.png")`
      : "none"};
  background-size: contain, contain;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;

  background-color: ${({ $isActive, $isWrongActive }) =>
    $isWrongActive
      ? `var(--signal-color)`
      : $isActive
      ? `var(--signal-color)`
      : `var(--neutral-color)`};

  border: 2px solid #ccc;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
`;

const SpeedUpMessage = styled.span`
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--signal-color);
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 10px;
  animation: fadeInOut 2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  z-index: 1000;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const CountdownMessage = styled(SpeedUpMessage)`
  top: 50px;
  z-index: 1000;
  font-size: 2rem;
  white-space: nowrap;
`;

export default function TappingGame({ onUpdatePetIndicator, activePet }) {
  const [gameStates, setGameStates] = useState({
    gameOn: false,
    activeCircles: [],
    activeWrongCircles: [],
    clickedCircles: [],
    clickAllowed: true,
    intervalTime: 1600,
    countdown: 60,
    score: 0,
    highscore: 0,
    instructions: false,
  });

  useEffect(() => {
    let interval;

    if (gameStates.gameOn) {
      interval = setInterval(() => {
        const isWrongActive = Math.random() < 0.3;
        const randomCircles = generateRandomCircles(3);

        const randomWrongCircles = isWrongActive
          ? generateRandomCircles(2, randomCircles)
          : [];

        setGameStates((prevValues) => ({
          ...prevValues,
          activeCircles: randomCircles,
          activeWrongCircles: randomWrongCircles,
          clickedCircles: [],
        }));

        const activeTime = Math.min(gameStates.intervalTime * 0.9, 1000);
        setTimeout(() => {
          setGameStates((prevValues) => ({
            ...prevValues,
            activeCircles: [],
            activeWrongCircles: [],
          }));
        }, activeTime);
      }, gameStates.intervalTime);
    }

    return () => clearInterval(interval);
  }, [gameStates.gameOn, gameStates.intervalTime]);

  useEffect(() => {
    let timer;

    if (gameStates.gameOn && gameStates.countdown > 0) {
      timer = setInterval(() => {
        setGameStates((prevValues) => {
          const newCountdown = prevValues.countdown - 1;
          const newIntervalTime =
            newCountdown % 10 === 0 && newCountdown !== 60
              ? Math.max(prevValues.intervalTime - 150, 600)
              : prevValues.intervalTime;

          if (newCountdown === 0) {
            handleReset(true);
          }

          return {
            ...prevValues,
            countdown: newCountdown,
            intervalTime: newIntervalTime,
          };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameStates.gameOn, gameStates.countdown]);

  function generateRandomCircles(max, exclude = []) {
    const numCircles = Math.floor(Math.random() * max) + 1;
    const randomCircles = new Set();

    while (randomCircles.size < numCircles) {
      const randomIndex = Math.floor(Math.random() * 20);
      if (!exclude.includes(randomIndex)) {
        randomCircles.add(randomIndex);
      }
    }

    return Array.from(randomCircles);
  }

  function handleCircleClick(index) {
    if (
      !gameStates.gameOn ||
      !gameStates.clickAllowed ||
      gameStates.clickedCircles.includes(index)
    )
      return;

    setGameStates((prevValues) => ({
      ...prevValues,
      clickAllowed: false,
      clickedCircles: [...prevValues.clickedCircles, index],
    }));

    setTimeout(() => {
      setGameStates((prevValues) => ({
        ...prevValues,
        clickAllowed: true,
      }));
    }, 200);

    const energyChange = gameStates.activeCircles.includes(index)
      ? 2
      : gameStates.activeWrongCircles.includes(index)
      ? -2
      : 0;

    if (energyChange === 2) {
      const itemSound = new Audio("/assets/music/item.mp3");
      itemSound.volume = 0.05;
      itemSound.play();
    } else if (energyChange === -2) {
      const itemSound = new Audio("/assets/music/fail.mp3");
      itemSound.volume = 0.05;
      itemSound.play();
    }
    if (energyChange !== 0) {
      setGameStates((prevValues) => ({
        ...prevValues,
        score: Math.max(prevValues.score + energyChange / 2, 0),
        highscore:
          energyChange === 2 && prevValues.score >= prevValues.highscore
            ? prevValues.score + 1
            : prevValues.highscore,
      }));
    }

    onUpdatePetIndicator(energyChange, "energy");
  }

  function handleStart() {
    setGameStates((prevValues) => ({
      ...prevValues,
      gameOn: true,
      score: 0,
      countdown: 60,
    }));
  }

  function handleReset(delay) {
    setGameStates((prevValues) => ({
      ...prevValues,
      gameOn: false,
      activeCircles: [],
      activeWrongCircles: [],
      clickedCircles: [],
    }));

    if (delay) {
      setTimeout(() => {
        setGameStates((prevValues) => ({
          ...prevValues,
          intervalTime: 1600,
          countdown: 60,
        }));
      }, 1800);
    } else {
      setGameStates((prevValues) => ({
        ...prevValues,
        intervalTime: 1600,
        countdown: 60,
      }));
    }
  }

  if (!gameStates.gameOn && activePet.status.energy === 100) {
    return <SummaryScreen itemsCaught={gameStates.score} tapping={true} />;
  }

  return (
    <StyledGamePage>
      {gameStates.instructions && (
        <Filter onClick={() => toggleInstructions(setGameStates)}></Filter>
      )}
      <StyledTitle>Tap the Capybara Game</StyledTitle>
      <StyledTappingGameField>
        {gameStates.countdown === 0 && (
          <CountdownMessage>Time is up!</CountdownMessage>
        )}
        {gameStates.countdown > 0 &&
          gameStates.countdown < 60 &&
          gameStates.countdown % 10 === 0 && (
            <SpeedUpMessage>Speed up!</SpeedUpMessage>
          )}

        <StyledIndicatorContainer>
          <Indicator
            showBarName={false}
            data={{
              name: "energy",
              count: gameStates.gameOn
                ? Math.min(activePet.status.energy, 100)
                : activePet.status.energy,
            }}
          />
        </StyledIndicatorContainer>
        <ScoreContainer
          countdown={gameStates.countdown}
          score={gameStates.score}
          highscore={gameStates.highscore}
          tapping={true}
        />

        {Array.from({ length: 20 }).map((_, index) => (
          <TappingCircle
            key={index}
            $isActive={gameStates.activeCircles.includes(index)}
            $isWrongActive={gameStates.activeWrongCircles.includes(index)}
            onClick={() => handleCircleClick(index)}
          />
        ))}
        {gameStates.instructions && <HowToPlay game="tapping" />}
      </StyledTappingGameField>
      <ButtonContainer
        gameOn={gameStates.gameOn}
        showArrowButtons={true}
        onStart={handleStart}
        onInstructions={() => toggleInstructions(setGameStates)}
        tapping={true}
        onReset={handleReset}
      />
    </StyledGamePage>
  );
}
