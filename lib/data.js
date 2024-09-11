export const pets = [
  {
    id: 1,
    name: "Johnny",
    type: "Dog",
    picture: "/assets/images/dog_front.png",
    image: "/assets/images/dog.png",
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
    icon: "/assets/images/dog_front.png",
    image: "/assets/images/dog.png",
    indicators: [
      { name: "happiness", count: 80 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 90 },
    ],
  },
  {
    type: "Cat",
    icon: "/assets/images/cat_front.png",
    image: "/assets/images/cat.png",
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 40 },
    ],
  },
  {
    type: "Dragonfly",
    icon: "/assets/images/dragonfly_front.png",
    image: "/assets/images/dragonfly.png",
    indicators: [
      { name: "happiness", count: 60 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 90 },
    ],
  },
  {
    type: "Fox",
    icon: "/assets/images/fox_front.png",
    image: "/assets/images/fox.png",
    indicators: [
      { name: "happiness", count: 70 },
      { name: "energy", count: 70 },
      { name: "intelligence", count: 80 },
    ],
  },
  {
    type: "Frog",
    icon: "/assets/images/frog_front.png",
    image: "/assets/images/frog.png",
    indicators: [
      { name: "happiness", count: 90 },
      { name: "energy", count: 50 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Capybara",
    icon: "/assets/images/capybara_front.png",
    image: "/assets/images/capybara.png",
    indicators: [
      { name: "happiness", count: 100 },
      { name: "energy", count: 100 },
      { name: "intelligence", count: 100 },
    ],
  },
  {
    type: "Snake",
    icon: "/assets/images/snake_front.png",
    image: "/assets/images/snake.png",
    indicators: [
      { name: "happiness", count: 75 },
      { name: "energy", count: 60 },
      { name: "intelligence", count: 55 },
    ],
  },
  {
    type: "Spider",
    icon: "/assets/images/spider_front.png",
    image: "/assets/images/spider.png",
    indicators: [
      { name: "happiness", count: 68 },
      { name: "energy", count: 55 },
      { name: "intelligence", count: 30 },
    ],
  },
  {
    type: "Samantha",
    icon: "/assets/images/samantha_front.png",
    image: "/assets/images/samantha.png",
    indicators: [
      { name: "happiness", count: 68 },
      { name: "energy", count: 55 },
      { name: "intelligence", count: 30 },
    ],
  },
];
