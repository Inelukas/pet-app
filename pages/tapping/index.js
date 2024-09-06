import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

const TappingCirclesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 310px;
  height: 520px;
  max-width: 375px;

  margin: 0 auto;
  padding: 10px;
  margin-top: 10px;
  background-image: url("/images/green.jpg");

  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  @media screen and (min-width: 600px) {
    transform: scale(1.2);
  }
  @media screen and (min-width: 900px) {
    transform: scale(1.5);
  }

  @media screen and (min-width: 1200px) {
    transform: scale(1.8);
  }
`;

const TappingCircle = styled.span`
  background-image: ${({ isActive, isWrongActive }) =>
    isWrongActive
      ? `url("/images/gollum.png"), url("/images/orange.jpg")`
      : isActive
      ? `url("/images/capybara.png"), url("/images/orange.jpg")`
      : `url("/images/silver.avif")`};

  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  border: 2px solid #ccc;

  cursor: pointer;
  width: calc(25% - 10px);
  height: calc(15% - 10px);
  border-radius: 50%;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 600px) {
    transform: scale(1.01);
  }
  @media screen and (min-width: 900px) {
    transform: scale(1.08);
  }

  @media screen and (min-width: 1200px) {
    transform: scale(1.1);
  }
`;

const StyledTappingButtonLink = styled(Link)`
  background-image: url("/images/backbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
  width: 30px;
  height: 30px;
  font-size: 30px;
  border: hidden;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledStartButton = styled.button`
  background-image: url("/images/playbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
  width: 30px;
  height: 30px;
  font-size: small;
  border: hidden;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledPauseButton = styled(StyledStartButton)`
  background-image: url("/images/pausebutton.png");
`;

const StyledResetButton = styled(StyledStartButton)`
  background-image: url("/images/resetbutton.png");
`;

const SpeedUpMessage = styled.span`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url("/images/orange.jpg");
  background-size: contain;
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
  background-image: url("/images/red.jpg");
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
  const [speedUpMessage, setSpeedUpMessage] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [timeUpMessage, setTimeUpMessage] = useState(false);

  const activePet = petCollection.find((pet) => pet.id === currentPet);

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        const isWrongActive = Math.random() < 0.3;
        const randomCircles = generateRandomCircles(3);
        const randomRedCircles = isWrongActive ? generateRandomCircles(2) : [];

        setActiveCircles(randomCircles);
        setActiveWrongCircles(randomRedCircles);

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
    if (score > 0 && score % 10 === 0) {
      setIntervalTime((prevTime) => Math.max(prevTime - 60, 600));
      setSpeedUpMessage(true);

      setTimeout(() => setSpeedUpMessage(false), 2000);
    }
  }, [score]);

  useEffect(() => {
    if (countdown === 0) {
      setTimeUpMessage(true);
      setTimeout(() => setTimeUpMessage(false), 1800);
      handleReset();
    }
  }, [countdown]);

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

  function generateRandomCircles(max) {
    const numCircles = Math.floor(Math.random() * max) + 1;
    const randomCircles = new Set();
    while (randomCircles.size < numCircles) {
      randomCircles.add(Math.floor(Math.random() * 20));
    }
    return Array.from(randomCircles);
  }

  function handleCircleClick(index) {
    if (!gameStarted || !clickAllowed) return;

    setClickAllowed(false);
    setTimeout(() => setClickAllowed(true), 300);

    if (activeCircles.includes(index)) {
      setScore((prevScore) => prevScore + 1);
      const newEnergyValue = Math.min(activePet.status.energy + 1, 100);
      onUpdatePetIndicator(newEnergyValue, "energy");
    } else if (activeWrongCircles.includes(index)) {
      setScore((prevScore) => prevScore - 1);
      const newEnergyValue = Math.min(activePet.status.energy - 1, 100);
      onUpdatePetIndicator(newEnergyValue, "energy");
    }
  }

  function handleStart() {
    setGameStarted(true);
    setCountdown(60);
  }

  function handlePause() {
    setGameStarted(false);
  }

  function handleReset() {
    setGameStarted(false);
    setActiveCircles([]);
    setActiveWrongCircles([]);
    setScore(0);
    setIntervalTime(1600);
    setSpeedUpMessage(false);
    setCountdown(60);
  }

  return (
    <>
      {timeUpMessage && <CountdownMessage>Time is up!</CountdownMessage>}
      {speedUpMessage && <SpeedUpMessage>Speed up!</SpeedUpMessage>}
      <TappingCirclesContainer>
        {Array.from({ length: 20 }).map((_, index) => (
          <TappingCircle
            key={index}
            isActive={activeCircles.includes(index)}
            isWrongActive={activeWrongCircles.includes(index)}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </TappingCirclesContainer>

      <span>Current Score: {score} </span>
      <span>Highscore: {highScore}</span>
      <span>Time left: {countdown}s </span>
      <span>Instructions</span>

      <StyledTappingButtonLink href="/garden">Back</StyledTappingButtonLink>
      {gameStarted ? (
        <StyledPauseButton onClick={handlePause}>Pause</StyledPauseButton>
      ) : (
        <StyledStartButton onClick={handleStart}>Start</StyledStartButton>
      )}
      <StyledResetButton onClick={handleReset}>Reset</StyledResetButton>
    </>
  );
}
