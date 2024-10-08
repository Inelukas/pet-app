import { keyframes } from "styled-components";

export const pets = [
  {
    id: "041530875dc",
    name: "Johnny",
    type: "Dog",
    picture: "/assets/images/dog_front.png",
    image: "/assets/images/dog.png",
    animations: {
      slug: "dog",
      size: "60",
      spriteNumber: { normal: 8, sleepy: 8, dead: 4 },
      scale: 2.5,
      position: 80,
    },
    characteristics: ["gluttonous", "melancholy"],
    status: {
      health: 40,
      hunger: 40,
      happiness: 50,
      energy: 50,
      intelligence: 50,
    },
    isDying: false,
    isAlive: true,
    isRevived: false,
    timeOfDeath: null,
  },
];

export const characteristicOptions = [
  { characteristic: "smart", opposite: "foolish" },
  { characteristic: "foolish", opposite: "smart" },
  { characteristic: "hyperactive", opposite: "lethargic" },
  { characteristic: "lethargic", opposite: "hyperactive" },
  { characteristic: "gluttonous", opposite: "temperate" },
  { characteristic: "temperate", opposite: "gluttonous" },
  { characteristic: "cheerful", opposite: "melancholy" },
  { characteristic: "melancholy", opposite: "cheerful" },
];

export const animalList = [
  {
    type: "Dog",
    icon: "/assets/images/dog_front.png",
    image: "/assets/images/dog.png",
    animations: {
      slug: "dog",
      size: "60",
      spriteNumber: { normal: 8, sleepy: 8, dead: 4 },
      scale: 2.5,
      position: 80,
    },
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Cat",
    icon: "/assets/images/cat_front.png",
    image: "/assets/images/cat.png",
    animations: {
      slug: "cat",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 8, dead: 4 },
      scale: 4,
      position: 110,
    },
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 25 },
    ],
  },
  {
    type: "Dragonfly",
    icon: "/assets/images/dragonfly_front.png",
    image: "/assets/images/dragonfly.png",
    animations: {
      slug: "dragonfly",
      size: "32",
      spriteNumber: { normal: 4, sleepy: 4, dead: 7 },
      scale: 4,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 60 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 20 },
    ],
  },
  {
    type: "Fox",
    icon: "/assets/images/fox_front.png",
    image: "/assets/images/fox.png",
    animations: {
      slug: "fox",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 6, dead: 7 },
      scale: 4,
      position: 130,
    },
    indicators: [
      { name: "happiness", count: 70 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 35 },
    ],
  },
  {
    type: "Frog",
    icon: "/assets/images/frog_front.png",
    image: "/assets/images/frog.png",
    animations: {
      slug: "frog",
      size: "48",
      spriteNumber: { normal: 7, sleepy: 8, dead: 8 },
      scale: 2.5,
      position: 70,
    },
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 20 },
    ],
  },
  {
    type: "Cobra",
    icon: "/assets/images/snake_front.png",
    image: "/assets/images/snake.png",
    animations: {
      slug: "cobra",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 8, dead: 6 },
      scale: 3,
      position: 100,
    },
    indicators: [
      { name: "happiness", count: 40 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 25 },
    ],
  },
  {
    type: "Capybara",
    icon: "/assets/images/capybara_front.png",
    image: "/assets/images/capybara.png",
    animations: {
      slug: "capybara",
      size: "64",
      spriteNumber: { normal: 8, sleepy: 8, dead: 8 },
      scale: 1.7,
      position: 80,
    },
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 10 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Spider",
    icon: "/assets/images/spider_front.png",
    image: "/assets/images/spider.png",
    animations: {
      slug: "spider",
      size: "32",
      spriteNumber: { normal: 9, sleepy: 3, dead: 9 },
      scale: 4,
      position: 130,
    },
    indicators: [
      { name: "happiness", count: 60 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 20 },
    ],
  },
];

export const indicatorZoomKeyframes = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const walkSmallScreen = keyframes`
  0% {
    transform: translateX(0);
  }
  16.67% {
    transform: translateX(70px);
  }
  33.33% {
    transform: translateX(120px) scaleX(-1);
  }
  66.67% {
    transform: translateX(-60px) scaleX(-1);
  }
  83.33% {
    transform: translateX(-120px) scaleX(1);
  }
  100% {
    transform: translateX(0);
  }
`;

export const walkLargeScreen = keyframes`
  0% {
    transform: translateX(0);
  }
  16.67% {
    transform: translateX(220px);
  }
  33.33% {
    transform: translateX(260px) scaleX(-1);
  }
  66.67% {
    transform: translateX(-160px) scaleX(-1);
  }
  83.33% {
    transform: translateX(-200px) scaleX(1);
  }
  100% {
    transform: translateX(0);
  }
`;
