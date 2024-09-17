import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StartPageGardenLink = styled(StyledLink)`
  border-radius: 10px;

  font-size: 0.9rem;
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

const InstructionsLink = styled(StyledLink)`
  border-radius: 10px;

  height: 2rem;
  font-size: 0.7rem;
  padding: 15px 35px;
  white-space: nowrap;

  @media (min-width: 600px) {
    font-size: 1rem;
    padding: 15px 60px;
  }

  @media (min-width: 900px) {
    font-size: 1.5rem;
    padding: 30px 70px;
  }

  @media (min-width: 1200px) {
    font-size: 1.7rem;
    padding: 30px 90px;
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
  const buttonText = petCollection.length > 0 ? "Go to Garden" : "Create Pet";
  const buttonLink = petCollection.length > 0 ? "/garden" : "/create";

  return (
    <StyledStartPage>
      <StyledImage
        alt="Pet App Logo"
        src="/assets/images/logo.png"
        width={400}
        height={400}
      />
      <StartButtonContainer>
        <StartPageGardenLink href={buttonLink}>
          {buttonText}
        </StartPageGardenLink>
        <InstructionsLink href="/instructions">Instructions</InstructionsLink>
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
