import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { VerticalBar, VerticalBarFill } from "../garden";
import { Icon } from "../garden";

const TappingGameContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 3px;
  height: 100vh;
  width: 100vw;

  @media screen and (min-width: 600px) {
    transform: scale(1.2);
  }
  @media screen and (min-width: 900px) {
    transform: scale(1.5);
  }

  @media screen and (min-width: 1200px) {
    transform: scale(1.6);
  }
`;

const BarAndCirclesContainer = styled.section`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const TappingCirclesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 310px;
  height: 540px;

  padding: 10px;
  margin-top: 50px;
  background-image: url("/images/green.jpg");

  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const TappingCircle = styled.button`
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
`;

const SpanContainer = styled.section`
  background-image: url("/images/silver.avif");
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

const StyledGardenLink = styled(Link)`
  background-image: url("/images/backbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
  width: 70px;
  height: 50px;

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
  width: 70px;
  height: 50px;
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
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url("/images/orange.jpg");
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
    setTimeout(() => setClickAllowed(true), 300);
    const energyChange = activeCircles.includes(index) ? 1 : -1;
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
    <TappingGameContainer>
      {countdown === 0 && <CountdownMessage>Time is up!</CountdownMessage>}
      {countdown > 0 && countdown < 60 && countdown % 10 === 0 && (
        <SpeedUpMessage>Speed up!</SpeedUpMessage>
      )}
      <BarAndCirclesContainer>
        <VerticalBar
          $critical={
            activePet.status.energy <= 25 && activePet.status.health !== 0
          }
        >
          <Icon role="img" aria-label="A battery indicating energy">
            🔋
          </Icon>
          <VerticalBarFill $bgcolor="yellow" value={activePet.status.energy} />
        </VerticalBar>
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
      </BarAndCirclesContainer>
      <SpanContainer>
        <span>Current Score: {score}</span>
        <span>Highscore: {highScore}</span>
        <span>Time left: {countdown}s</span>
      </SpanContainer>
      <ButtonsContainer>
        <StyledGardenLink href="/garden">Back</StyledGardenLink>
        {gameStarted ? (
          <StyledPauseButton onClick={handlePause}>Pause</StyledPauseButton>
        ) : (
          <StyledStartButton onClick={handleStart}>Start</StyledStartButton>
        )}
        <StyledResetButton onClick={() => handleReset(false)}>
          Reset
        </StyledResetButton>
      </ButtonsContainer>
    </TappingGameContainer>
  );
}
