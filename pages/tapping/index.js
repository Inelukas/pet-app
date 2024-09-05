import { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledButtonLink } from "..";

const TappingGameContainer = styled.div`
  background-image: url("/images/darkgreen.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTappingButtonLink = styled(StyledButtonLink)`
  background-image: url("/images/backbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  box-shadow: none;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    background-color: transparent;
  }
`;

const StyledTappingButton = styled.button`
  display: grid;
  background-color: transparent;
  place-content: center;
  width: 3rem;
  height: 3rem;
  font-size: small;
  border: hidden;

  margin: 0 20px;

  cursor: pointer;

  background-image: url("/images/orangebutton.png");
  font-family: sans-serif;

  text-decoration: none;
  padding: 20px 50px;
  white-space: nowrap;
  &:hover {
    transform: scale(1.2);
  }

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

const StyledStartButton = styled(StyledTappingButton)`
  background-image: url("/images/playbutton.png");
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: transparent;
`;

const StyledPauseButton = styled(StyledStartButton)`
  background-image: url("/images/pausebutton.png");
`;

const StyledResetButton = styled(StyledStartButton)`
  background-image: url("/images/resetbutton.png");
`;

const TappingCirclesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90vw;
  height: 80vh;
  max-width: 375px;

  margin: 0 auto;
  padding: 10px;
  margin-top: 10px;
  background-image: url("/images/green.jpg");

  background-position: center; /* Adjust this */
  background-repeat: no-repeat;
  border-radius: 15px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  @media (min-width: 600px) {
    gap: 15px;
    width: 80vw;
    height: 70vh;
    max-width: 600px;
    max-height: 600px;
  }

  @media (min-width: 900px) {
    gap: 15px;
    width: 70vw;
    height: 70vh;
    max-width: 900px;
    max-height: 700px;
  }

  @media (min-width: 1200px) {
    gap: 15px;
    width: 60vw;
    height: 80vh;
    max-width: 1200px;
    max-height: 900px;
  }
`;

const TappingCircle = styled.span`
  background-image: ${({ isActive, isRedActive }) =>
    isRedActive
      ? `url("/images/red.jpg")`
      : isActive
      ? `url("/images/orange.jpg")`
      : `url("/images/silver.avif")`};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.1rem;
  font-weight: bold;
  cursor: pointer;
  width: calc(25% - 10px);
  height: calc(15% - 10px);
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 600px) {
    width: calc(20% - 15px);
    height: calc(20% - 15px);
    font-size: 1rem;
  }

  @media (min-width: 900px) {
    width: calc(18% - 15px);
    height: calc(23% - 15px);
    font-size: 1.2rem;
  }

  @media (min-width: 1200px) {
    width: calc(18% - 15px);
    height: calc(23% - 15px);
    font-size: 1.5rem;
  }
`;

const TappingSpanContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 1.2rem;
  color: #333;
  gap: 20px;

  @media (min-width: 600px) {
    flex-direction: row;
    font-size: 1.5rem;
    gap: 50px;
  }
`;

const TappingButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  margin-top: 15px;

  @media (min-width: 600px) {
    flex-direction: row;
    padding: 20px;
    gap: 20px;
    margin-top: 20px;
  }
`;

const SpeedUpMessage = styled.span`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--signal-color);
  color: #fff;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 10px;
  animation: fadeInOut 2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (min-width: 600px) {
    top: 20px;
    font-size: 2rem;
    padding: 15px 30px;
  }
`;

export default function TappingGame({
  petCollection,
  currentPet,
  onUpdatePetIndicator,
}) {
  const [activeCircle, setActiveCircle] = useState(null);
  const [activeRedCircle, setActiveRedCircle] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1200);
  const [clickAllowed, setClickAllowed] = useState(true);
  const [speedUpMessage, setSpeedUpMessage] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const minIntervalTime = 600;

  const activePet = petCollection.find((pet) => pet.id === currentPet);

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        const isRedActive = Math.random() < 0.3;
        const randomCircle = Math.floor(Math.random() * 20);

        if (isRedActive) {
          setActiveRedCircle(randomCircle);
          setActiveCircle(null);
        } else {
          setActiveCircle(randomCircle);
          setActiveRedCircle(null);
        }

        const activeTime = Math.min(intervalTime * 0.9, 700);
        setTimeout(() => {
          setActiveCircle(null);
          setActiveRedCircle(null);
        }, activeTime);
      }, intervalTime);
    }

    return () => clearInterval(interval);
  }, [gameStarted, intervalTime]);

  useEffect(() => {
    if (score > 0 && score % 10 === 0) {
      setIntervalTime((prevTime) => Math.max(prevTime - 60, minIntervalTime));
      setSpeedUpMessage(true);

      setTimeout(() => setSpeedUpMessage(false), 2000);
    }
  }, [score]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  function handleCircleClick(index) {
    if (!gameStarted || !clickAllowed) return;

    setClickAllowed(false);
    setTimeout(() => setClickAllowed(true), 300);

    if (index === activeCircle) {
      setScore((prevScore) => prevScore + 1);
      const newEnergyValue = Math.min(activePet.status.energy + 1, 100);
      onUpdatePetIndicator(newEnergyValue, "energy");
    } else if (index === activeRedCircle) {
      setScore((prevScore) => prevScore - 1);
      const newEnergyValue = Math.min(activePet.status.energy - 1, 100);
      onUpdatePetIndicator(newEnergyValue, "energy");
    }
  }

  function handleStart() {
    setGameStarted(true);
  }

  function handlePause() {
    setGameStarted(false);
  }

  function handleReset() {
    setGameStarted(false);
    setActiveCircle(null);
    setActiveRedCircle(null);
    setScore(0);
    setIntervalTime(1200);
    setSpeedUpMessage(false);
  }

  return (
    <TappingGameContainer>
      {speedUpMessage && <SpeedUpMessage>Speed up!</SpeedUpMessage>}
      <TappingCirclesContainer>
        {Array.from({ length: 20 }).map((_, index) => (
          <TappingCircle
            key={index}
            isActive={index === activeCircle}
            isRedActive={index === activeRedCircle}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </TappingCirclesContainer>
      <TappingSpanContainer>
        <span>Current Score: {score} </span>
        <span>Highscore: {highScore}</span>
      </TappingSpanContainer>
      <TappingButtonContainer>
        <StyledTappingButtonLink href="/garden">Back</StyledTappingButtonLink>
        {gameStarted ? (
          <StyledPauseButton onClick={handlePause}>Pause</StyledPauseButton>
        ) : (
          <StyledStartButton onClick={handleStart}>Start</StyledStartButton>
        )}
        <StyledResetButton onClick={handleReset}>Reset</StyledResetButton>
      </TappingButtonContainer>
    </TappingGameContainer>
  );
}

// How the Circles are rendered:

/* Array.from({ length: 20 }): Creates an array with 20 undefined elements. This array is then mapped over to generate 20 TappingCircle components.

map((_, index): Maps each element in the array to a TappingCircle component, where index represents the current circle's index.

key={index}: Adds a unique key prop to each TappingCircle to help React manage the list efficiently.

This approach keeps your component clean and makes it easy to adjust the number of circles if needed in the future. */

/* {1. Array.from({ length: 12 }):
Array.from(): This method creates a new array from an array-like or iterable object.
{ length: 12 }: Here, we're passing an object with a length property set to 12 to Array.from(). This essentially creates an array with 12 undefined elements. The resulting array will look like this: [undefined, undefined, ..., undefined] (12 times).

2. .map((_, index) => ...):
.map(): This method creates a new array by calling a provided function on every element in the calling array.
(_, index): This is a function passed to .map() that will be executed for each element in the array. It takes two arguments:
_ (underscore): This is a placeholder for the first argument, which would normally be the value of the array element. Since the array elements are all undefined and we're not using them, the underscore is often used to indicate an unused variable.
index: This is the second argument that .map() provides, representing the current index of the array element. For an array of 12 elements, index will range from 0 to 11.

3. <GridItem key={index}>{index + 1}</GridItem>:
<GridItem>: This is a React component (styled div) that represents one square in the grid.
key={index}: The key prop is used by React to identify which items have changed, are added, or are removed. The index is unique for each element, making it a good candidate for the key prop in this context.
{index + 1}: Inside the GridItem, we display index + 1. Since index starts at 0, adding 1 makes it start at 1, resulting in the numbers 1 through 12 being displayed in the grid items.

Putting It All Together:
Array.from({ length: 12 }) creates an array with 12 elements.
.map((_, index) => <GridItem key={index}>{index + 1}</GridItem>) iterates over that array, generating a GridItem for each index. Each GridItem has a unique key based on the index and displays a number from 1 to 12.
This approach is useful when you want to dynamically generate a set of components based on a specific number of items, in this case, the 12 square fields for the tapping game interface.} */

// How the Buttons are lighting up:

/* activeIndex State:

The activeIndex state keeps track of which circle is currently "lit up." It is initially set to null, meaning no circle is active.
useEffect Hook:

This hook sets up an interval that selects a random circle index every 1.5 seconds (1500 ms).
The selected index is set as the activeIndex, causing the corresponding circle to "light up."
After 1 second (1000 ms), the active circle is reset to null, turning it off.
The interval is cleared when the component unmounts to avoid memory leaks.
TappingCircle Styling:

The TappingCircle component receives an isActive prop. If isActive is true, the circle's background color changes to var(--secondary-color), making it appear "lit up."
A CSS transition is applied for a smooth color change effect.
Customization:
You can adjust the timings (1500 ms for interval and 1000 ms for reset) to make the game more or less challenging.
You can also add event handlers to increment the score when a user clicks on the active circle.
This setup should create a basic tapping game where circles light up randomly, providing a simple yet interactive game interface */

/* How keeping Score works: 

currentScore State:

A new state variable currentScore is added to track the user's score.
It starts at 0 and increments whenever the user successfully clicks an active circle.
handleCircleClick Function:

This function is called whenever a circle is clicked. It checks if the clicked circle's index matches the activeIndex (i.e., whether it is currently active).
If the circle is active, it increments the currentScore by 1.
onClick Event Handler:

The onClick event is attached to each TappingCircle. When a circle is clicked, it triggers the handleCircleClick function with the index of the clicked circle.
Rendering the Current Score:

The current score is displayed in the TappingSpanContainer alongside the placeholder for the high score.
This will give you a basic tapping game where the score increases every time the user clicks on an active circle. You can further extend this by adding a high score feature, game-over conditions, and other game mechanics as needed. */

/* How intervall works:

Key Points:
Managing Interval Timing Directly: The interval variable is declared inside the useEffect and used to store the interval ID. This ID is used to clear the interval when needed.
Cleanup Function: The clearInterval(interval) call in the cleanup function ensures that the interval is cleared properly when the game is paused or reset.
This approach achieves the desired functionality without using useRef, managing everything through state and effect hooks directly.
 
intervalTime State: Keeps track of the interval time. This time decreases as the score reaches new milestones.
useEffect for Interval Timing: Updates the interval timing when the currentScore is a multiple of 10.
Cleanup of Intervals: The clearInterval(interval) call ensures that previous intervals are cleaned up properly whenever the gameStarted state changes or when the component is unmounted.
With this setup, the game will progressively increase the speed at which circles light up as the player’s score increases, making the game more challenging over time.*/

/* How Red Circle works:

activeRedCircle State: A new state that tracks which circle is red.
Random Red Circle Appearance: The red circle appears less frequently, with a 30% chance (Math.random() < 0.3).
Score Decrease: When the red circle is clicked, the score decreases by 1 in the handleCircleClick function. */
