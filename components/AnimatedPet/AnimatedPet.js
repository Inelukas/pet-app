import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const foxMoveAnimation = keyframes`
  0% { background-position: 0 -64px; }
  100% { background-position: -256px -64px; }
`;

const foxMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -160px; }
  100% { background-position: -192px -160px; }
`;

const foxMoveAnimationDead = keyframes`
  0% { background-position: 0 -192px; }
  100% { background-position: -224px -192px; }
`;

const catMoveAnimation = keyframes`
  0% { background-position: 0 -160px; }
  100% { background-position: -256px -160px; }
`;

const catMoveAnimationSleepy = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -256px 0; }
`;

const catMoveAnimationDead = keyframes`
  0% { background-position: 0 -672px; }
  100% { background-position: -128px -672px; }
`;

const spiderMoveAnimation = keyframes`
  0% { background-position: 0 -320px; }
  100% { background-position: -288px -320px; }
`;

const spiderMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -416px; }
  100% { background-position: -96px -416px; }
`;

const spiderMoveAnimationDead = keyframes`
  0% { background-position: 0 -448px; }
  100% { background-position: -288px -448px; }
`;

const cobraMoveAnimation = keyframes`
  0% { background-position: 0 -32px; }
  100% { background-position: -256px -32px; }
`;

const cobraMoveAnimationSleepy = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -256px 0; }
`;

const cobraMoveAnimationDead = keyframes`
  0% { background-position: 0 -128px; }
  100% { background-position: -192px -128px; }
`;

const brainMoveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -128px 0; }
`;

const capybaraMoveAnimation = keyframes`
  0% { background-position: 0 -512px; }
  100% { background-position: -512px -512px; }
`;

const capybaraMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -384px; }
  100% { background-position: -512px -384px; }
`;

const capybaraMoveAnimationDead = keyframes`
  0% { background-position: 0 -192px; }
  100% { background-position: -512px -192px; }
`;

const samanthaMoveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -701px 0; }
`;

const samanthaMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -134px; }
  100% { background-position: -701px -134px; }
`;

const samanthaMoveAnimationDead = keyframes`
  0% { background-position: 0 -268px; }
  100% { background-position: -701px -268px; }
`;

const dogMoveAnimation = keyframes`
  0% { background-position: -512px -192px; }
  100% { background-position: 0 -192px; }
`;

const dogMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -48px; }
  100% { background-position: -512px -48px; }
`;

const dogMoveAnimationDead = keyframes`
  0% { background-position: -256px -384px; }
  100% { background-position: -512px -384px; }
`;

const frogMoveAnimation = keyframes`
  0% { background-position: 0 -48px; }
  100% { background-position: -336px -48px; }
`;

const frogMoveAnimationSleepy = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -384px 0; }
`;

const frogMoveAnimationDead = keyframes`
  0% { background-position: 0 -192px; }
  100% { background-position: -384px -192px; }
`;

const dragonflyMoveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -128px 0; }
`;

const dragonflyMoveAnimationSleepy = keyframes`
  0% { background-position: 0 -64px; }
  100% { background-position: -128px -64px; }
`;

const dragonflyMoveAnimationDead = keyframes`
  0% { background-position: 0 -96px; }
  100% { background-position: -224px -96px; }
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
  frog: {
    normal: frogMoveAnimation,
    sleepy: frogMoveAnimationSleepy,
    dying: frogMoveAnimationDead,
  },
  spider: {
    normal: spiderMoveAnimation,
    sleepy: spiderMoveAnimationSleepy,
    dying: spiderMoveAnimationDead,
  },
  dog: {
    normal: dogMoveAnimation,
    sleepy: dogMoveAnimationSleepy,
    dying: dogMoveAnimationDead,
  },
  fox: {
    normal: foxMoveAnimation,
    sleepy: foxMoveAnimationSleepy,
    dying: foxMoveAnimationDead,
  },
  cat: {
    normal: catMoveAnimation,
    sleepy: catMoveAnimationSleepy,
    dying: catMoveAnimationDead,
  },
  cobra: {
    normal: cobraMoveAnimation,
    sleepy: cobraMoveAnimationSleepy,
    dying: cobraMoveAnimationDead,
  },
  dragonfly: {
    normal: dragonflyMoveAnimation,
    sleepy: dragonflyMoveAnimationSleepy,
    dying: dragonflyMoveAnimationDead,
  },
  capybara: {
    normal: capybaraMoveAnimation,
    sleepy: capybaraMoveAnimationSleepy,
    dying: capybaraMoveAnimationDead,
  },
  samantha: {
    normal: samanthaMoveAnimation,
    sleepy: samanthaMoveAnimationSleepy,
    dying: samanthaMoveAnimationDead,
  },
};

const StyledAnimatedPet = styled.div`
  position: absolute;
  bottom: ${({ $pet }) => `${$pet.position}px`};
  width: ${({ $pet }) => `${$pet.size}px`};
  height: ${({ $pet }) => `${$pet.size}px`};
  background-image: ${({ $pet }) =>
    `url(/assets/sprite-sheets/${$pet.slug}-sprite-sheet.png)`};
  animation: ${({ $pet, $sleepy, $dying }) => {
    if (!$dying && $sleepy) {
      return css`1s steps(${$pet.spriteNumber.sleepy}) infinite ${
        animationsMap[`${$pet.slug}`].sleepy
      }`;
    }
    if ($dying) {
      return css`4s steps(${$pet.spriteNumber.dead}) 1 ${
        animationsMap[`${$pet.slug}`].dying
      }`;
    }
    if (!$dying) {
      return css`1.5s steps(${$pet.spriteNumber.normal}) infinite ${
        animationsMap[`${$pet.slug}`].normal
      }`;
    }
  }};
  transform: ${({ $pet }) => `scale(${$pet.scale})`};
  image-rendering: pixelated;
`;

const MovementDiv = styled.div`
  animation: ${({ $dying, $movingSpeedFactor, $sleepy }) =>
    !$dying && !$sleepy
      ? css`
          ${walk} ${20 * $movingSpeedFactor}s infinite
        `
      : "none"};
`;

export default function AnimatedPet({
  pet,
  dying,
  movingSpeedFactor,
  setPetCollection,
  currentPet,
}) {
  const [sleepy, setSleepy] = useState(false);

  useEffect(() => {
    const setStateInterval = setInterval(() => {
      setSleepy((prevVal) =>
        Math.ceil(Math.random() * 10) >= 5 ? !prevVal : prevVal
      );
    }, 20000 * movingSpeedFactor);
    return () => clearInterval(setStateInterval);
  }, []);

  useEffect(() => {
    if (dying) {
      setSleepy(false);

      const dyingTimer = setTimeout(() => {
        setPetCollection((prevPets) =>
          prevPets.map((pet) => {
            if (pet.id === currentPet) {
              return { ...pet, dying: false, alive: false };
            }
            return pet;
          })
        );
      }, 4000);

      return () => clearTimeout(dyingTimer);
    }
  }, [dying]);

  return (
    <MovementDiv
      $dying={dying}
      $movingSpeedFactor={movingSpeedFactor}
      $sleepy={sleepy}
    >
      <StyledAnimatedPet $pet={pet} $sleepy={sleepy} $dying={dying} />
    </MovementDiv>
  );
}
