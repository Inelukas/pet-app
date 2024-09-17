import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";
import { StyledHowToPlay } from "./snake";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import { useState } from "react";

export const StyledStartPage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  gap: 30px;

  @media (min-width: 600px) {
    gap: 60px;
  }

  @media (min-width: 900px) {
    gap: 70px;
  }

  @media (min-width: 1200px) {
    gap: 80px;
  }
`;

export const StyledImage = styled(Image)`
  width: 300px;
  height: 300px;

  @media (min-width: 600px) {
    width: 500px;
    height: 500px;
  }

  @media (min-width: 900px) {
    width: 600px;
    height: 600px;
  }

  @media (min-width: 1200px) {
    width: 700px;
    height: 700px;
  }
`;

const StartButtonContainer = styled.section`
  display: flex;
`;

export const StyledButtonLink = styled(StyledLink)`
  border-radius: 10px;

  font-size: small;
  padding: 20px 50px;
  white-space: nowrap;

  @media (min-width: 600px) {
    font-size: 1.5rem;
    padding: 35px 80px;
  }

  @media (min-width: 900px) {
    font-size: 1.75rem;
    padding: 50px 100px;
  }

  @media (min-width: 1200px) {
    font-size: 2rem;
    padding: 50px 120px;
  }
`;

const StyledStartConfirmButton = styled(ConfirmButton)`
  width: 1rem;
  height: 1rem;
  font-size: 0.5rem;
  border-radius: 10px;
  padding: 25px;
`;

const StyledStartInstructions = styled(StyledHowToPlay)`
  display: flex;
  place-content: start;
  gap: 20px;
  background: var(--secondary-color);
  font-size: 0.8rem;
  line-height: 2;
  width: 120%;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: 2;
  @media screen and (min-width: 900px) {
    display: block;
    width: 120px;
    right: -140px;
    left: unset;
    top: 20px;
    font-size: 0.6rem;
    background: none;
    padding: 0;
    line-height: 1.5;
  }
  @media screen and (min-width: 1200px) {
    width: 200px;
    font-size: 0.8rem;
    right: -230px;
  }
`;

export const StyledStartSpan = styled.span`
  font-size: large;
  background: linear-gradient(90deg, #d5ed9f, #ff9100, #fffbe6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 2rem;
  }

  @media (min-width: 900px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

export default function StartPage({ petCollection }) {
  const [instructions, setInstructions] = useState(false);
  const buttonText = petCollection.length > 0 ? "Go to Garden" : "Create Pet";
  const buttonLink = petCollection.length > 0 ? "/garden" : "/create";

  function toggleInstructions() {
    setInstructions((prevInstructions) => !prevInstructions);
  }

  return (
    <StyledStartPage>
      <StyledImage
        alt="Pet App Logo"
        src="/assets/images/logo.png"
        width={400}
        height={400}
      />
      {instructions && (
        <StyledStartInstructions>
          <h2>Welcome to your Pet App!</h2>
          <ul>
            <li> Raise your Pet and keep it happy. Play Games to </li>{" "}
            <li>
              {" "}
              Try to tap the circles lighting up, but only those displaying your
              pet. Tapping a capybara rewards points.{" "}
            </li>{" "}
            <li>
              {" "}
              Tapping a circle displaying a ghost will result in point
              deduction.{" "}
            </li>{" "}
            <li>
              {" "}
              More tapped pets = more energy! Each pet adds +1 to your
              animal&apos;s energy bar. Try to tap as many as possible.{" "}
            </li>{" "}
            <li>
              Every 10 seconds, the game speeds up, increasing difficulty. Each
              round lasts for 60 seconds. Happy tapping!
            </li>
          </ul>
        </StyledStartInstructions>
      )}
      <StartButtonContainer>
        <StyledButtonLink href={buttonLink}>{buttonText}</StyledButtonLink>
        <StyledStartConfirmButton onClick={() => toggleInstructions()}>
          Instructions
        </StyledStartConfirmButton>
      </StartButtonContainer>
      <StyledStartSpan>
        Create your own Pet - Feed it, train it, keep it happy!
      </StyledStartSpan>
    </StyledStartPage>
  );
}

/* Pet Care App Instructions
Welcome to the Pet Care App! Follow these instructions to create, manage, and care for your virtual pets.

Main Features:
1. Creating a Pet
To create a new pet:
Go to the Pet List by clicking the Staple of Books Button on the main screen.
Tap the Plus (+) Button on the Pet List page to create your own pet.
Customize your pet by giving it a name, choosing its type, and assigning characteristics.
2. Viewing Pet Details
On the Pet List:
Tap any pet to view its details.
You will see information such as the pet’s name, type, characteristics, and vital stats like:
Intelligence
Energy
Hunger
Happiness
3. Managing Your Pet's Health in the Pet Garden
In the Pet Garden, your currently selected pet is displayed. It is crucial to monitor your pet’s:
Energy: Decreases over time but can be replenished.
Hunger: Increases as time passes and needs to be reduced.
Happiness: Affects your pet's mood and overall well-being.
Danger:
If Energy and Happiness drop to 0 and Hunger reaches 100, your pet’s Health will decline.
If Health reaches 0, your pet will die.
4. Keeping Your Pet Alive - Mini-Games
To keep your pet alive and healthy, you can play mini-games that boost its stats. These mini-games are accessible via the top-right corner of the Garden page:
Tapping Game: Increases your pet’s Energy.
Happy Family Game (Snake): Raises your pet’s Happiness.
Catch the Food Game: Reduces your pet’s Hunger.
5. When a Pet Dies
If your pet dies, it will be transferred to the Graveyard.
To access the Graveyard, go to the Pet List Page and click on the Graveyard section.
In the Graveyard, you can Revive your pet, but it will return as a Ghost.
Ghosts:
Ghosts cannot die again but cannot participate in mini-games or interact the same way as living pets.
6. Deleting Pets and Ghosts
You have the option to delete any pet or ghost. Be careful, as this will result in their permanent removal from the app.
Go to the Pet List or Graveyard.
Select the pet or ghost you wish to delete.
Confirm their deletion.
Conclusion:
Take care of your pet by managing its energy, hunger, and happiness levels. If things go wrong, revive your pet as a ghost or start over with a new one. Enjoy playing and nurturing your virtual companions! */
