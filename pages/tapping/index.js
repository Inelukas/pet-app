import { useState, useEffect } from "react";
import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";

const TappingContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 70vw;
  height: 70vh;
  margin: 0 auto;
`;

const TappingCircle = styled.span`
  background-color: ${({ isActive }) =>
    isActive ? "var(--signal-color)" : "var(--neutral-color)"};
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease;
`;

const TappingSpanContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const TappingButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 100px;
`;

export default function TappingGame() {
  const [activeCircle, setActiveCircle] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        const randomCircle = Math.floor(Math.random() * 16);
        setActiveCircle(randomCircle);

        setTimeout(() => {
          setActiveCircle(null);
        }, 1000);
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  const handleCircleClick = (index) => {
    if (!gameStarted) return;

    if (index === activeCircle) {
      setCurrentScore((prevScore) => prevScore + 1);
    } else {
      setCurrentScore((prevScore) => prevScore - 1);
    }
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handlePause = () => {
    setGameStarted(false);
  };

  const handleReset = () => {
    setGameStarted(false);
    setActiveCircle(null);
    setCurrentScore(0);
  };

  return (
    <>
      <TappingContainer>
        {Array.from({ length: 16 }).map((_, index) => (
          <TappingCircle
            key={index}
            isActive={index === activeCircle}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </TappingContainer>
      <TappingSpanContainer>
        <span>Current Score: {currentScore}</span>
        <span>Highscore:</span>
      </TappingSpanContainer>
      <TappingButtonContainer>
        <StyledLink href="/create">Back</StyledLink>
        {gameStarted ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </TappingButtonContainer>
    </>
  );
}
// How the Circles are rendered:

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
