import { useState, useEffect } from "react";
import styled from "styled-components";
import Indicator from "@/components/Indicator/Indicator";
import { StyledSnakePage, StyledGameField } from "../snake";
import StyledLink from "@/components/StyledLink/StyledLink";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";

const StyledTappingGameField = styled(StyledGameField)`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns */
  grid-template-rows: repeat(4, 1fr); /* 4 rows */
  gap: 10px; /* Space between circles */
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
`;
const BarAndCirclesContainer = styled.section`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const TappingIndicatorContainer = styled.section`
  transform: rotate(270deg);
  width: 300px;
`;

const TappingCircle = styled.button`
  background-image: ${({ isActive, isWrongActive }) =>
    isWrongActive
      ? `url("/images/ghost.png")`
      : isActive
      ? `url("/images/capybara.png")`
      : "none"};

  background-size: contain, contain;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;

  background-color: ${({ isActive, isWrongActive }) =>
    isWrongActive
      ? `var(--signal-color)`
      : isActive
      ? `var(--signal-color)`
      : `var(--neutral-color)`};

  border: 2px solid #ccc;
  cursor: pointer;
  width: 100%; /* Make the button fill the grid cell */
  height: 100%; /* Make the button fill the grid cell */
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
`;

const SpanContainer = styled.section`
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-top: 10px;

  gap: 10px;
  border-radius: 15px;
  padding: 5px;
  width: 310px;
  height: 45px;
`;

const ButtonsContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 310px;
  height: 45px;
  margin-top: 5px;
`;

const SpeedUpMessage = styled.span`
  position: absolute;
  top: 200px;
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
  top: 275px;
  z-index: 1000;

  font-size: 4rem;
`;

export default function TappingGame({
  petCollection,
  currentPet,
  onUpdatePetIndicator,
}) {
  const [activeCircles, setActiveCircles] = useState([]);
  const [activeWrongCircles, setActiveWrongCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1600);
  const [clickAllowed, setClickAllowed] = useState(true);

  const [highScore, setHighScore] = useState(0);
  const [countdown, setCountdown] = useState(60);

  const activePet = petCollection.find((pet) => pet.id === currentPet);

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        const isWrongActive = Math.random() < 0.3;
        const randomCircles = generateRandomCircles(3);

        const randomWrongCircles = isWrongActive
          ? generateRandomCircles(2, randomCircles)
          : [];

        setActiveCircles(randomCircles);
        setActiveWrongCircles(randomWrongCircles);

        const activeTime = Math.min(intervalTime * 0.9, 1000);
        setTimeout(() => {
          setActiveCircles([]);
          setActiveWrongCircles([]);
        }, activeTime);
      }, intervalTime);
    }

    return () => clearInterval(interval);
  }, [gameStarted, intervalTime]);

  useEffect(() => {
    if (gameStarted && countdown % 10 === 0 && countdown !== 60) {
      setIntervalTime((prevTime) => Math.max(prevTime - 150, 600));
    }
    if (countdown === 0) {
      handleReset(true);
    }
  }, [countdown, gameStarted]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    let timer;
    if (gameStarted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, countdown]);

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
    if (!gameStarted || !clickAllowed) return;

    setClickAllowed(false);
    setTimeout(() => setClickAllowed(true), 200);
    const energyChange = activeCircles.includes(index)
      ? 1
      : activeWrongCircles.includes(index)
      ? -1
      : 0;
    setScore((prevScore) => prevScore + energyChange);
    const newEnergyValue = Math.min(
      activePet.status.energy + energyChange,
      100
    );
    onUpdatePetIndicator(newEnergyValue, "energy");
  }

  function handleStart() {
    setGameStarted(true);
    setCountdown(60);
  }

  function handlePause() {
    setGameStarted(false);
  }

  function handleReset(delay = false) {
    setGameStarted(false);
    setActiveCircles([]);
    setActiveWrongCircles([]);
    setScore(0);
    setIntervalTime(1600);

    if (delay) {
      setTimeout(() => setCountdown(60), 1800);
    } else {
      setCountdown(60);
    }
  }

  return (
    <StyledSnakePage>
      <h1>Tap the Capybara Game</h1>
      {countdown === 0 && <CountdownMessage>Time is up!</CountdownMessage>}
      {countdown > 0 && countdown < 60 && countdown % 10 === 0 && (
        <SpeedUpMessage>Speed up!</SpeedUpMessage>
      )}

      <BarAndCirclesContainer>
        <TappingIndicatorContainer>
          <Indicator
            showBarName={false}
            data={{
              name: "energy",
              count: activePet.status.energy,
            }}
          />
        </TappingIndicatorContainer>
        <StyledTappingGameField>
          {Array.from({ length: 20 }).map((_, index) => (
            <TappingCircle
              key={index}
              isActive={activeCircles.includes(index)}
              isWrongActive={activeWrongCircles.includes(index)}
              onClick={() => handleCircleClick(index)}
            />
          ))}
        </StyledTappingGameField>
      </BarAndCirclesContainer>
      <SpanContainer>
        <span>Current Score: {score}</span>
        <span>Highscore: {highScore}</span>
        <span>Time left: {countdown}s</span>
      </SpanContainer>
      <ButtonsContainer>
        <StyledLink href="/garden">Back</StyledLink>
        {gameStarted ? (
          <ConfirmButton onClick={handlePause}>Pause</ConfirmButton>
        ) : (
          <ConfirmButton onClick={handleStart}>Start</ConfirmButton>
        )}
        <ConfirmButton onClick={() => handleReset(false)}>Reset</ConfirmButton>
      </ButtonsContainer>
    </StyledSnakePage>
  );
}
