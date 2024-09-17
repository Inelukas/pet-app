import { StyledStartPage } from "..";
import styled from "styled-components";
import { useState } from "react";
import { GardenPageWrapper } from "@/components/LinkButtons/LinkButtons";
import Link from "next/link";

const StyledFirstWord = styled.span`
  display: inline-block;
  margin: 5px;
  font-size: 1.3rem;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background-color: var(--signal-color);
  background-image: var(--button-image);
  font-family: sans-serif;
  border: 1px solid #000000;
  color: #000000;
  box-shadow: 2px 2px #000000;
  text-decoration: none;
  min-width: 350px;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: var(--secondary-color);
  }

  @media (min-width: 600px) {
    font-size: 1.3rem;
    padding: 15px 60px;
    min-width: 400px;
  }

  @media (min-width: 900px) {
    font-size: 1.5rem;
    padding: 25px 65px;
    min-width: 460px;
  }

  @media (min-width: 1200px) {
    font-size: 1.6rem;
    padding: 30px 70px;
    min-width: 490px;
  }
`;

const ListItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ExpandedText = styled.span`
  margin-top: 10px;
  text-align: left;
  max-width: 500px;
  display: block;
  font-size: medium;

  @media (min-width: 600px) {
    font-size: large;
  }

  @media (min-width: 900px) {
    font-size: larger;
  }

  @media (min-width: 1200px) {
    font-size: x-large;
  }
`;

const InstructionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Instructions() {
  const [expanded, setExpanded] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleExpanded = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const instructions = [
    {
      firstWord: "Creating a new pet",
      rest: `To create a new pet, go to the Pet List by clicking the Staple of Books Button on the main screen. Tap the Plus (+) Button on the Pet List page to create your own pet. Customize your pet by giving it a name, choosing its type, and assigning characteristics. The characteristics affect the initial values of your pet as well as their increase and decrease rate.`,
    },
    {
      firstWord: "View pet details",
      rest: `To view Pet Details, tap any pet on the Pet List to view its details. You will see information such as the pet’s name, type, characteristics, and all the stats: Intelligence, Energy, Hunger, and Happiness.`,
    },
    {
      firstWord: "The pet garden",
      rest: `In the Pet Garden, your currently selected pet is displayed. It is crucial to monitor your pet’s: Energy: Decreases over time but can be replenished. Hunger: Increases as time passes and needs to be reduced. Happiness: Affects your pet’s mood and overall well-being. Danger: If Energy and Happiness drop to 0 and Hunger reaches 100, your pet’s Health will decline. If Health reaches 0, your pet will die.`,
    },
    {
      firstWord: "Keep your pet happy and alive",
      rest: `To keep your pet alive and healthy, you can play mini-games that boost its stats. These mini-games are accessible via the top-right corner of the Garden page: Tapping Game: Increases your pet’s Energy. Happy Family Game (Snake): Raises your pet’s Happiness. Catch the Food Game: Reduces your pet’s Hunger.`,
    },
    {
      firstWord: "The unthinkable: your pet dies!",
      rest: `If your pet dies, it will be transferred to the Graveyard. To access the Graveyard, go to the Pet List Page and click on the Graveyard section. In the Graveyard, you can Revive your pet, but it will return as a Ghost.`,
    },
    {
      firstWord: "The graveyard",
      rest: `A Pet that has become a Ghost cannot die again but also cannot participate in mini-games or interact the same way as living pets. You have the option to delete any pet or ghost. Be careful, as this will result in their permanent removal from the app.`,
    },
  ];

  return (
    <StyledStartPage>
      <h1>
        Follow these instructions to create, manage, and care for your virtual
        pets.{" "}
      </h1>
      <InstructionsWrapper>
        {instructions.map((item, index) => (
          <ListItem key={index} onClick={() => toggleExpanded(index)}>
            <StyledFirstWord>{item.firstWord}</StyledFirstWord>
            {expanded[index] && <ExpandedText>{item.rest}</ExpandedText>}
          </ListItem>
        ))}
      </InstructionsWrapper>
      <GardenPageWrapper>
        <Link href="/" aria-label="A house indicating the Start page">
          🏠
        </Link>
      </GardenPageWrapper>
    </StyledStartPage>
  );
}
