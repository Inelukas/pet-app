import { useState, useEffect } from "react";
import styled from "styled-components";
import Indicator from "@/components/Indicator/Indicator";
import {
  StyledSnakePage,
  StyledGameField,
  StyledIndicatorContainer,
  StyledScoreAndButtonContainer,
  StyledScoreContainer,
  StyledButtonContainer,
  StyledHowToPlay,
} from "../snake";
import StyledLink from "@/components/StyledLink/StyledLink";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";

const StyledHeader = styled.h1`
  margin-bottom: 25px;
`;

const StyledTappingGameField = styled(StyledGameField)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;

  min-height: 375px;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledGameFieldAndScoreContainer = styled.section`
  display: flex;
`;

const TappingCircle = styled.button`
  background-image: ${({ isActive, isWrongActive }) =>
    isWrongActive
      ? `url("/images/ghost_front.png")`
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
  width: 100%;
  height: 100%;
  border-radius: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledTappingScoreContainer = styled(StyledScoreContainer)`
  margin-left: 30px;
  gap: 30px;
  margin-top: -10px;
  @media screen and (min-width: 600px) {
    margin-top: 10px;
  }
  @media screen and (min-width: 900px) {
    margin-top: 20px;
  }
  @media screen and (min-width: 1200px) {
    margin-top: 20px;
  }
`;

const StyledTappingButtonContainer = styled(StyledButtonContainer)`
  margin-top: -20px;
  @media screen and (min-width: 900px) {
    margin-top: -30px;
  }
`;

const TappingConfirmButton = styled(ConfirmButton)`
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
`;

const StyledTappingLink = styled(StyledLink)`
  font-size: 1rem;
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
  const [instructions, setInstructions] = useState(false);
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

  function toggleInstructions() {
    setInstructions((prevInstructions) => !prevInstructions);
  }

  return (
    <StyledSnakePage>
      <StyledHeader>Tap the Capybara Game</StyledHeader>
      <StyledTappingGameField>
        {countdown === 0 && <CountdownMessage>Time is up!</CountdownMessage>}
        {countdown > 0 && countdown < 60 && countdown % 10 === 0 && (
          <SpeedUpMessage>Speed up!</SpeedUpMessage>
        )}

        <StyledIndicatorContainer>
          <Indicator
            showBarName={false}
            data={{
              name: "energy",
              count: activePet.status.energy,
            }}
          />
        </StyledIndicatorContainer>

        {Array.from({ length: 20 }).map((_, index) => (
          <TappingCircle
            key={index}
            isActive={activeCircles.includes(index)}
            isWrongActive={activeWrongCircles.includes(index)}
            onClick={() => handleCircleClick(index)}
          />
        ))}
        {instructions && (
          <StyledHowToPlay>
            <h2>How To Play</h2>
            <ul>
              <li>
                {" "}
                Use your mouse or finger to tap the circles on the screen.{" "}
              </li>{" "}
              <li>
                {" "}
                Try to tap the circles lighting up, but only those displaying a
                capybara. Tapping a capybara rewards one point.{" "}
              </li>{" "}
              <li>
                {" "}
                Tapping a circle displaying a ghost will result in point
                deduction.{" "}
              </li>{" "}
              <li>
                {" "}
                More tapped capybaras = more energy! Each capybara adds +1 to
                your animal&apos;s energy bar. Try to tap as many as possible.{" "}
              </li>{" "}
              <li>
                Every 10 seconds, the game speeds up, increasing difficulty.
                Each round lasts for 60 seconds. Happy tapping!
              </li>
            </ul>
          </StyledHowToPlay>
        )}
      </StyledTappingGameField>
      <StyledScoreAndButtonContainer>
        <StyledTappingScoreContainer>
          <span>Current Score: {score}</span>
          <span>Highscore: {highScore}</span>
          <span>Time left: {countdown}s</span>
        </StyledTappingScoreContainer>

        <StyledTappingButtonContainer>
          <StyledTappingLink href="/garden">Back</StyledTappingLink>
          {gameStarted ? (
            <TappingConfirmButton onClick={handlePause}>
              Pause
            </TappingConfirmButton>
          ) : (
            <TappingConfirmButton onClick={handleStart}>
              Start
            </TappingConfirmButton>
          )}
          <TappingConfirmButton onClick={() => handleReset(false)}>
            Reset
          </TappingConfirmButton>
          <TappingConfirmButton onClick={() => toggleInstructions()}>
            Instructions
          </TappingConfirmButton>
        </StyledTappingButtonContainer>
      </StyledScoreAndButtonContainer>
    </StyledSnakePage>
  );
}
