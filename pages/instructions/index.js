import { StyledStartPage } from "..";
import styled from "styled-components";
import { useState } from "react";

const StyledInstructionsPage = styled(StyledStartPage)`
  padding-top: 80px;
`;

const InstructionsHeading = styled.span`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 900px) {
    font-size: 1.7rem;
  }
`;

const StyledFirstWord = styled.span`
  display: inline-block;
  margin: 5px;

  font-size: 1.2rem;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background: var(--signal-gradient);

  box-shadow: var(--global-shadow);
  text-decoration: none;
  min-width: 350px;

  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--secondary-gradient);
    box-shadow: var(--global-shadow);
    transform: scale(1.1);
  }
  &:active {
    background: var(--secondary-gradient);
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background: var(--neutral-gradient);
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
  margin-bottom: 5px;
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
  background: var(--secondary-gradient);
  border-radius: 10px;
  padding: 7px;
  box-shadow: var(--global-shadow);

  @media (min-width: 600px) {
    font-size: large;
  }

  @media (min-width: 900px) {
    font-size: larger;
  }
`;

const InstructionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    margin-top: -30px;
  }

  @media (min-width: 900px) {
    margin-top: -50px;
  }
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
      rest: `To create a new pet, go to the Pet List by clicking the List Button on the main screen. Tap the Plus (+) Button on the Pet List page to create your own pet. Customize your pet by giving it a name, choosing its type, and assigning characteristics. `,
    },
    {
      firstWord: "Pet details and characteristics",
      rest: `To view Pet Details, tap any pet on the Pet List to view its details. You will see information such as the pet’s name, type, characteristics, and all the stats: intelligence, energy, hunger, and happiness. The characteristics affect the initial values of your pet as well as their increase and decrease rate. For example: a smart pet has a higher initial intelligence, a gluttonous one becomes hungry more easily. Every characteristic has silver linings and downsides - have fun exploring them!`,
    },
    {
      firstWord: "The pet garden",
      rest: `In the Pet Garden, your currently selected pet is displayed. It is crucial to monitor your pet’s Indicators. Energy and happiness decrease over time but can be replenished by playing games. Your pet’s hunger increases as time passes and needs to be reduced, also by playing a mini-game. Danger: If energy and happiness drop to 0 and hunger reaches 100, your pet’s health will decline. If health reaches 0, your pet will die.`,
    },
    {
      firstWord: "Mini-games and achievements",
      rest: `To keep your pet alive and healthy, you can play mini-games that boost its stats. These mini-games are accessible via the top-right corner of the Garden page. The Tapping Game increases your pet’s energy. The Happy Family Game (Snake) raises your pet’s happiness. Catch the Food Game reduces your pet’s hunger. Also, playing games will unlock achievements. Unlocking achievements will result in fantastic rewards for your pet!`,
    },
    {
      firstWord: "The unthinkable: your pet dies!",
      rest: `If your pet dies, it will be transferred to the Graveyard. To access the Graveyard, go to the Pet List Page and click on the Graveyard section. In the Graveyard, you can Revive your pet, but it will return as a Ghost.`,
    },
    {
      firstWord: "Pet ghosts",
      rest: `A Pet that has become a Ghost cannot die again but also cannot participate in mini-games or interact the same way as living pets. You have the option to delete any pet or ghost. Be careful, as this will result in their permanent removal from the app.`,
    },
  ];

  return (
    <StyledInstructionsPage>
      <InstructionsHeading>Choose a feature: </InstructionsHeading>
      <InstructionsWrapper>
        {instructions.map((item, index) => (
          <ListItem key={index} onClick={() => toggleExpanded(index)}>
            <StyledFirstWord>{item.firstWord}</StyledFirstWord>
            {expanded[index] && <ExpandedText>{item.rest}</ExpandedText>}
          </ListItem>
        ))}
      </InstructionsWrapper>
    </StyledInstructionsPage>
  );
}
