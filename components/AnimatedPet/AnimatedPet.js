import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

// const foxMoveAnimation = keyframes`
//   0% { background-position: 0 -96px; }
//   100% { background-position: -352px -96px; }
// `;

const foxMoveAnimation = keyframes`
  0% { background-position: 0 -64px; }
  100% { background-position: -256px -64px; }
`;

const foxMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -160px; }
  100% { background-position: -192px -160px; }
`;

const catMoveAnimation = keyframes`
  0% { background-position: 0 -160px; }
  100% { background-position: -256px -160px; }
`;

const catMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -192px; }
  100% { background-position: -128px -192px; }
`;

const spiderMoveAnimation = keyframes`
  0% { background-position: 0 -320px; }
  100% { background-position: -288px -320px; }
`;

const spiderMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -416px; }
  100% { background-position: -96px -416px; }
`;

const cobraMoveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -256px 0; }
`;

const brainMoveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -128px 0; }
`;

const capybaraMoveAnimation = keyframes`
  0% { background-position: 0 -512px; }
  100% { background-position: -512px -512px; }
`;

const samanthaMoveAnimation = keyframes`
  0% { background-position: 0 -0; }
  100% { background-position: -759px 0; }
`;

const dogMoveAnimation = keyframes`
  0% { background-position: 0 -384px; }
  100% { background-position: -960px -384px; }
`;

const dogMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -768px; }
  100% { background-position: -1536px -768px; }
`;

const frogMoveAnimation = keyframes`
  0% { background-position: 0 -48px; }
  100% { background-position: -336px -48px; }
`;

const frogMoveAnimationSleepy = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -384px 0; }
`;

const walk = keyframes`
  0% {
    transform: translateX(0);
  }
  16.67% {
    transform: translateX(20vw);
  }
  33.33% {
    transform: translateX(20vw) scaleX(-1);
  }
  50% {
    transform: translateX(0px) scaleX(-1);
  }
  66.67% {
    transform: translateX(-20vw) scaleX(-1);
  }
  83.33% {
    transform: translateX(-20vw) scaleX(1);
  }
  100% {
    transform: translateX(0);
  }
`;

const animationsMap = {
  frog: frogMoveAnimation,
  frogSleepy: frogMoveAnimationSleepy,
  spider: spiderMoveAnimation,
  spiderSleepy: spiderMoveAnimationSleepy,
  dog: dogMoveAnimation,
  dogSleepy: dogMoveAnimationSleepy,
  fox: foxMoveAnimation,
  foxSleepy: foxMoveAnimationSleepy,
  cat: catMoveAnimation,
  catSleepy: catMoveAnimationSleepy,
  capybara: capybaraMoveAnimation,
  capybaraSleepy: capybaraMoveAnimation,
  samantha: samanthaMoveAnimation,
  samanthaSleepy: samanthaMoveAnimation,
};

const StyledAnimatedPet = styled.div`
  position: absolute;
  bottom: ${({ $pet }) => `${$pet.position}px`};
  width: ${({ $pet }) => `${$pet.size}px`};
  height: ${({ $pet }) => `${$pet.size}px`};
  background-image: ${({ $pet }) =>
    `url(/assets/${$pet.slug}-sprite-sheet.png)`};
  animation: ${({ $pet, $sleepy }) =>
    css`
      ${$sleepy
        ? animationsMap[`${$pet.slug}Sleepy`]
        : animationsMap[$pet.slug]} 1s steps(${$sleepy
        ? $pet.spriteNumber.sleepy
        : $pet.spriteNumber.normal}) infinite
    `};
  transform: ${({ $pet }) => `scale(${$pet.scale})`};
  image-rendering: pixelated;
`;

const MovementDiv = styled.div`
  animation: ${({ $alive, $movingSpeedFactor, $sleepy }) =>
    $alive && !$sleepy
      ? css`
          ${walk} ${10 * $movingSpeedFactor}s infinite
        `
      : "none"};
`;

export default function AnimatedPet({ pet, alive, movingSpeedFactor }) {
  const [sleepy, setSleepy] = useState(false);

  useEffect(() => {
    const setStateInterval = setInterval(() => {
      setSleepy((prevVal) =>
        Math.ceil(Math.random() * 10) >= 5 ? !prevVal : prevVal
      );
    }, 10000 * movingSpeedFactor);
    return () => clearInterval(setStateInterval);
  }, []);

  return (
    <MovementDiv
      $alive={alive}
      $movingSpeedFactor={movingSpeedFactor}
      $sleepy={sleepy}
    >
      <StyledAnimatedPet $pet={pet} $sleepy={sleepy} />
    </MovementDiv>
  );
}
