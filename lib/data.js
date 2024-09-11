export const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Dog",
    picture: "🐶",
    animations: {
      slug: "dog",
      size: "60",
      spriteNumber: { normal: 8, sleepy: 8, dead: 4 },
      scale: 2,
      position: 200,
    },
    characteristics: ["smart", "melancholy"],
    status: {
      health: 40,
      hunger: 40,
      happiness: 50,
      energy: 50,
      intelligence: 30,
    },
    dying: false,
    alive: true,
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
    icon: "🐶",
    animations: {
      slug: "dog",
      size: "60",
      spriteNumber: { normal: 8, sleepy: 8, dead: 4 },
      scale: 2,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Cat",
    icon: "🐱",
    animations: {
      slug: "cat",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 8, dead: 4 },
      scale: 3,
      position: 250,
    },
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 25 },
    ],
  },
  {
    type: "Spider",
    icon: "🕷️",
    animations: {
      slug: "spider",
      size: "32",
      spriteNumber: { normal: 9, sleepy: 3, dead: 9 },
      scale: 4,
      position: 250,
    },
    indicators: [
      { name: "happiness", count: 60 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 10 },
    ],
  },
  {
    type: "Fox",
    icon: "🦊",
    animations: {
      slug: "fox",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 6, dead: 7 },
      scale: 4,
      position: 250,
    },
    indicators: [
      { name: "happiness", count: 70 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Frog",
    icon: "🐸",
    animations: {
      slug: "frog",
      size: "48",
      spriteNumber: { normal: 7, sleepy: 8, dead: 8 },
      scale: 2,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 15 },
    ],
  },
  {
    type: "Cobra",
    icon: "🐍",
    animations: {
      slug: "cobra",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 8, dead: 6 },
      scale: 3,
      position: 240,
    },
    indicators: [
      { name: "happiness", count: 40 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 20 },
    ],
  },
  {
    type: "Dragon Fly",
    icon: "🪰",
    animations: {
      slug: "dragonfly",
      size: "32",
      spriteNumber: { normal: 4, sleepy: 4, dead: 7 },
      scale: 3.5,
      position: 280,
    },
    indicators: [
      { name: "happiness", count: 50 },
      { name: "energy", count: 80 },
      { name: "intelligence", count: 10 },
    ],
  },
  {
    type: "Capybara",
    icon: "𐃶",
    animations: {
      slug: "capybara",
      size: "64",
      spriteNumber: { normal: 8, sleepy: 8, dead: 8 },
      scale: 1.7,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 10 },
      { name: "intelligence", count: 20 },
    ],
  },
  {
    type: "Samantha",
    icon: "🌚",
    animations: {
      slug: "samantha",
      size: "136",
      spriteNumber: { normal: 5, sleepy: 5, dead: 5 },
      scale: 0.6,
      position: 150,
    },
    indicators: [
      { name: "happiness", count: 100 },
      { name: "energy", count: 100 },
      { name: "intelligence", count: 100 },
    ],
  },
];
