export const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Fox",
    icon: "🦊",
    animations: {
      slug: "fox",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 6 },
      scale: 5,
      position: 200,
    },
    characteristics: ["gluttonous", "melancholy"],
    status: {
      health: 40,
      hunger: 40,
      happiness: 80,
      energy: 70,
      intelligence: 90,
    },
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
      size: "192",
      spriteNumber: { normal: 5, sleepy: 8 },
      scale: 1.5,
      position: 100,
    },
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 90 },
    ],
  },
  {
    type: "Cat",
    icon: "🐱",
    animations: {
      slug: "cat",
      size: "32",
      spriteNumber: { normal: 8, sleepy: 4 },
      scale: 6,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 40 },
    ],
  },
  {
    type: "Spider",
    icon: "🕷️",
    animations: {
      slug: "spider",
      size: "32",
      spriteNumber: { normal: 9, sleepy: 3 },
      scale: 5,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 60 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 90 },
    ],
  },
  {
    type: "Fox",
    icon: "🦊",
    animations: {
      slug: "fox",
      size: "32",
      spriteNumber: { normal: 11, sleepy: 6 },
      scale: 5,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 70 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 80 },
    ],
  },
  {
    type: "Frog",
    icon: "🐸",
    animations: {
      slug: "frog",
      size: "48",
      spriteNumber: { normal: 7, sleepy: 8 },
      scale: 3,
      position: 150,
    },
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Capybara",
    icon: "𐃶",
    animations: {
      slug: "capybara",
      size: "64",
      spriteNumber: { normal: 8, sleepy: 6 },
      scale: 3,
      position: 200,
    },
    indicators: [
      { name: "happiness", count: 100 },
      { name: "energy", count: 100 },
      { name: "intelligence", count: 100 },
    ],
  },
  {
    type: "Samantha",
    icon: "🌚",
    animations: {
      slug: "samantha",
      size: "143",
      spriteNumber: { normal: 5, sleepy: 6 },
      scale: 1,
      position: 100,
    },
    indicators: [
      { name: "happiness", count: 100 },
      { name: "energy", count: 100 },
      { name: "intelligence", count: 100 },
    ],
  },
];
