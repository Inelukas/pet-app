import { walkLargeScreen, walkSmallScreen } from "@/lib/data";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const animationsMap = {
  frog: createAnimations("-48px", "0px", "-192px", 48, 7, 8, 8),
  spider: createAnimations("-320px", "-416px", "-448px", 32, 9, 3, 9),
  dog: createAnimations("-192px", "-48px", "-384px", 60, 8, 8, 4, "-512px"),
  cat: createAnimations("-160px", "0", "-672px", 32, 8, 8, 4),
  fox: createAnimations("-64px", "-160px", "-192px", 32, 8, 6, 7),
  cobra: createAnimations("-32px", "0", "-128px", 32, 8, 8, 6),
  dragonfly: createAnimations("0", "-64px", "-96px", 32, 4, 4, 7),
  capybara: createAnimations("-512px", "-384px", "-192px", 64, 8, 8, 8),
  samantha: createAnimations("0", "-134px", "-268px", 140, 5, 5, 5),
};

function createAnimation(startY, width, frames, startX = 0) {
  return keyframes`
      0% { background-position: ${startX} ${startY}; }
      100% { background-position: ${
        startX !== 0 ? 0 : `${-width * frames}px`
      } ${startY}; }
    `;
}

function createAnimations(
  moveY,
  sleepY,
  deadY,
  width,
  framesMove,
  framesSleep,
  framesDead,
  startX
) {
  return {
    normal: createAnimation(moveY, width, framesMove, startX),
    sleepy: createAnimation(sleepY, width, framesSleep, startX),
    dying: createAnimation(deadY, width, framesDead, startX),
  };
}

const AnimatedPetWrapper = styled.div`
  position: absolute;
  bottom: ${({ $pet }) => `${$pet.position}px`};
  width: ${({ $pet }) => `${$pet.size}px`};
  height: ${({ $pet }) => `${$pet.size}px`};
  background-image: ${({ $pet }) =>
    `url(/assets/sprite-sheets/${$pet.slug}-sprite-sheet.png)`};
  animation: ${({ $pet, $sleepy, $dying }) => {
    if (!$dying && $sleepy) {
      return css`1s steps(${$pet.spriteNumber.sleepy}) infinite ${
        animationsMap[$pet.slug].sleepy
      }`;
    }
    if ($dying) {
      return css`4s steps(${$pet.spriteNumber.dead}) 1 ${
        animationsMap[$pet.slug].dying
      }`;
    }
    if (!$dying) {
      return css`1.5s steps(${$pet.spriteNumber.normal}) infinite ${
        animationsMap[$pet.slug].normal
      }`;
    }
  }};
  transform: ${({ $pet }) => `scale(${$pet.scale})`};
  image-rendering: pixelated;
`;

const HorizontalPetMovement = styled.div`
  animation: ${({ $dying, $movingSpeedFactor, $sleepy }) =>
    !$dying && !$sleepy
      ? css`
          ${walkSmallScreen} ${20 * $movingSpeedFactor}s infinite
        `
      : "none"};

  @media (min-width: 900px) {
    animation: ${({ $dying, $movingSpeedFactor, $sleepy }) =>
      !$dying && !$sleepy
        ? css`
            ${walkLargeScreen} ${20 * $movingSpeedFactor}s infinite
          `
        : "none"};
  }
`;

export default function AnimatedPet({
  pet,
  dying,
  movingSpeedFactor,
  onDeadPet,
}) {
  const [sleepy, setSleepy] = useState(false);

  useEffect(() => {
    const setStateInterval = setInterval(() => {
      setSleepy((prevVal) =>
        Math.ceil(Math.random() * 10) >= 2 ? !prevVal : prevVal
      );
    }, 20000 * movingSpeedFactor);
    return () => clearInterval(setStateInterval);
  }, []);

  useEffect(() => {
    if (dying) {
      setSleepy(false);

      const dyingTimer = setTimeout(() => onDeadPet(), 4000);

      return () => clearTimeout(dyingTimer);
    }
  }, [dying]);

  return (
    <HorizontalPetMovement
      $dying={dying}
      $movingSpeedFactor={movingSpeedFactor}
      $sleepy={sleepy}
    >
      <AnimatedPetWrapper $pet={pet} $sleepy={sleepy} $dying={dying} />
    </HorizontalPetMovement>
  );
}
