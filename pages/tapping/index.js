import { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledButtonLink } from "..";
import { VerticalBar, VerticalBarFill, Icon } from "../garden";

const StyledTappingButtonLink = styled(StyledButtonLink)`
  background-image: url("/images/backbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  box-shadow: none;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    background-color: transparent;
  }
`;

const StyledTappingButton = styled.button`
  display: grid;
  background-color: transparent;
  place-content: center;
  width: 3rem;
  height: 3rem;
  font-size: small;
  border: hidden;

  margin: 0 20px;

  cursor: pointer;

  background-image: url("/images/orangebutton.png");
  font-family: sans-serif;

  text-decoration: none;
  padding: 20px 50px;
  white-space: nowrap;
  &:hover {
    transform: scale(1.2);
  }

  @media (min-width: 600px) {
    font-size: 1.5rem;
    padding: 35px 80px;
  }

  @media (min-width: 900px) {
    font-size: 1.75rem;
    padding: 50px 100px;
  }

  @media (min-width: 1200px) {
    font-size: 2rem;
    padding: 50px 120px;
  }
`;

const StyledStartButton = styled(StyledTappingButton)`
  background-image: url("/images/playbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
`;

const StyledPauseButton = styled(StyledStartButton)`
  background-image: url("/images/pausebutton.png");
`;

const StyledResetButton = styled(StyledStartButton)`
  background-image: url("/images/resetbutton.png");
`;

const TappingCirclesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90vw;
  height: 80vh;
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

  @media (min-width: 600px) {
    gap: 15px;
    width: 80vw;
    height: 70vh;
    max-width: 600px;
    max-height: 600px;
  }

  @media (min-width: 900px) {
    gap: 15px;
    width: 70vw;
    height: 70vh;
    max-width: 900px;
    max-height: 700px;
  }

  @media (min-width: 1200px) {
    gap: 15px;
    width: 60vw;
    height: 80vh;
    max-width: 1200px;
    max-height: 900px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.1rem;
  font-weight: bold;
  cursor: pointer;
  width: calc(25% - 10px);
  height: calc(15% - 10px);
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 600px) {
    width: calc(20% - 15px);
    height: calc(20% - 15px);
    font-size: 1rem;
  }

  @media (min-width: 900px) {
    width: calc(18% - 15px);
    height: calc(23% - 15px);
    font-size: 1.2rem;
  }

  @media (min-width: 1200px) {
    width: calc(18% - 15px);
    height: calc(23% - 15px);
    font-size: 1.5rem;
  }
`;

const TappingSpanContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-size: 1.2rem;
  color: #333;
  gap: 20px;

  @media (min-width: 600px) {
    flex-direction: row;
    font-size: 1.5rem;
    gap: 50px;
  }
`;

const TappingButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  margin-top: 5px;

  @media (min-width: 600px) {
    flex-direction: row;
    padding: 20px;
    gap: 20px;
    margin-top: 20px;
  }
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

  @media (min-width: 600px) {
    top: 20px;
    font-size: 2rem;
    padding: 15px 30px;
  }
`;

const CountdownMessage = styled(SpeedUpMessage)`
  top: 275px;
  z-index: 1000;
  background-image: url("/images/red.jpg");
  font-size: 4rem;
`;

const TappingVerticalBar = styled(VerticalBar)`
  position: relative;
  background: none;
  background-image: url("/images/silver.avif");
`;

const TappingVerticalBarFill = styled(VerticalBarFill)`
  background: none;
  background-image: url("/images/yellow.avif");
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
    <div>
      <TappingVerticalBar>
        <Icon role="img" aria-label="A battery indicating energy">
          🔋
        </Icon>
        <TappingVerticalBarFill
          $bgcolor="yellow"
          value={activePet.status.energy}
        />
      </TappingVerticalBar>
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
      <TappingSpanContainer>
        <span>Current Score: {score} </span>
        <span>Highscore: {highScore}</span>
        <span>Time left: {countdown}s </span>
        <span>Instructions </span>
      </TappingSpanContainer>
      <TappingButtonContainer>
        <StyledTappingButtonLink href="/garden">Back</StyledTappingButtonLink>
        {gameStarted ? (
          <StyledPauseButton onClick={handlePause}>Pause</StyledPauseButton>
        ) : (
          <StyledStartButton onClick={handleStart}>Start</StyledStartButton>
        )}
        <StyledResetButton onClick={handleReset}>Reset</StyledResetButton>
      </TappingButtonContainer>
    </div>
  );
}
