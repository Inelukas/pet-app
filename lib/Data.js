export const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Turtle",
    picture: "🐢",
    characteristics: ["smart", "joyful"],
    status: {
      health: 100,
      hunger: 30,
      happiness: 85,
      energy: 30,
      intelligence: 100,
    },
  },
  {
    id: 2,
    name: "Samantha",
    type: "Camel",
    picture: "🐪",
    characteristics: ["curious", "piggish"],
    status: {
      health: 100,
      hunger: 50,
      happiness: 60,
      energy: 55,
      intelligence: 65,
    },
  },
  {
    id: 3,
    name: "Jürgen",
    type: "Unicorn",
    picture: "🦄",
    characteristics: ["stupid", "picky"],
    status: {
      health: 100,
      hunger: 40,
      happiness: 95,
      energy: 85,
      intelligence: 75,
    },
  },
  {
    id: 4,
    name: "Jeremiah",
    type: "Owl",
    picture: "🦉",
    characteristics: ["lazy", "smart"],
    status: {
      health: 100,
      hunger: 40,
      happiness: 95,
      energy: 85,
      intelligence: 75,
    },
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
    indicators: [
      { name: "Happiness", count: 80 },
      { name: "Energy", count: 70 },
      { name: "Intelligence", count: 90 },
    ],
  },
  {
    type: "Cat",
    icon: "🐱",
    indicators: [
      { name: "Happiness", count: 90 },
      { name: "Energy", count: 60 },
      { name: "Intelligence", count: 40 },
    ],
  },
  {
    type: "Mouse",
    icon: "🐭",
    indicators: [
      { name: "Happiness", count: 60 },
      { name: "Energy", count: 50 },
      { name: "Intelligence", count: 90 },
    ],
  },
  {
    type: "Fox",
    icon: "🦊",
    indicators: [
      { name: "Happiness", count: 70 },
      { name: "Energy", count: 70 },
      { name: "Intelligence", count: 80 },
    ],
  },
  {
    type: "Frog",
    icon: "🐸",
    indicators: [
      { name: "Happiness", count: 90 },
      { name: "Energy", count: 50 },
      { name: "Intelligence", count: 30 },
    ],
  },
  {
    type: "Capybara",
    icon: "𐃶",
    indicators: [
      { name: "Happiness", count: 100 },
      { name: "Energy", count: 100 },
      { name: "Intelligence", count: 100 },
    ],
  },
];