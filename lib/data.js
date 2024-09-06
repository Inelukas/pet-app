export const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Dog",
    picture: "🐶",
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
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 90 },
    ],
  },
  {
    type: "Cat",
    icon: "🐱",
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 40 },
    ],
  },
  {
    type: "Mouse",
    icon: "🐭",
    indicators: [
      { name: "happiness", count: 60 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 90 },
    ],
  },
  {
    type: "Fox",
    icon: "🦊",
    indicators: [
      { name: "happiness", count: 70 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 80 },
    ],
  },
  {
    type: "Frog",
    icon: "🐸",
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Capybara",
    icon: "𐃶",
    indicators: [
      { name: "happiness", count: 100 },
      { name: "energy", count: 100 },
      { name: "intelligence", count: 100 },
    ],
  },
];