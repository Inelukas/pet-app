import styled from "styled-components";

export const StyledGamePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #f1f3c2;
  position: fixed;
`;

export const StyledGameField = styled.div`
  display: grid;
  place-content: center;
  width: 300px;
  min-height: 300px;
  background: #008000;
  background-image: var(--game-image);
  border: 2px solid #000000;
  border-radius: 20px;
  position: relative;
  border: 5px solid #000000;
  @media screen and (min-width: 600px) {
    width: 360px;
    min-height: 360px;
  }
  @media screen and (min-width: 1200px) {
    width: 440px;
    min-height: 440px;
  }
`;

export const StyledTitle = styled.h1`
  padding: 20px 0;
  @media screen and (min-width: 1200px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

export const StyledIndicatorContainer = styled.section`
  position: absolute;
  left: -175px;
  top: 60px;
  transform: rotate(270deg);
  width: 300px;

  @media screen and (min-width: 600px) {
    left: -200px;
  }
`;

export const Filter = styled.div`
  width: 100%;
  min-height: 100%;
  position: fixed;
  bottom: 0;
  z-index: 2;
  background: #00000099;
  @media screen and (min-width: 900px) {
    display: none;
  }
`;

const StyledHowToPlay = styled.div`
  display: grid;
  place-content: center;
  gap: 20px;
  background: var(--secondary-color);
  font-size: 0.8rem;
  line-height: 2;
  width: 120%;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  top: -20px;
  left: -30px;
  z-index: 3;
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

export function HowToPlay({ game }) {
  return (
    <>
      {game === "snake" && (
        <StyledHowToPlay>
          <h2>How To Play</h2>
          <ul>
            <li>
              Use the arrow keys or the on-screen buttons to move your animal.
            </li>
            <li>
              Collect the small animals on the screen; a child will be added to
              your animal.
            </li>
            <li>
              Build a big capybara family without touching the walls or running
              over your children.
            </li>
            <li>
              More children = more happiness! Each child adds +1 to your
              animal&apos;s happiness bar.
            </li>
            <li>
              To increase the intelligence of your pet you need a score of at
              least 5.
            </li>
            <li>Try to have a family of more than 100 children!</li>
          </ul>
        </StyledHowToPlay>
      )}

      {game === "tapping" && (
        <StyledHowToPlay>
          <h2>How To Play</h2>
          <ul>
            <li>Use your mouse or finger to tap the circles on the screen.</li>
            <li>
              Try to tap the circles lighting up, but only those displaying a
              capybara. Tapping a capybara rewards one point.
            </li>
            <li>
              Tapping a circle displaying a ghost will result in point
              deduction.
            </li>
            <li>
              More tapped capybaras = more energy! Each capybara adds +1 to your
              animal&apos;s energy bar. Try to tap as many as possible.
            </li>
            <li>
              Every 10 seconds, the game speeds up, increasing difficulty. Each
              round lasts for 60 seconds. Happy tapping!
            </li>
          </ul>
        </StyledHowToPlay>
      )}

      {game === "catchfood" && (
        <StyledHowToPlay>
          <h2>How To Play</h2>
          <ul>
            <li>
              Use the arrow keys or on-screen buttons to move your pet left and
              right.
            </li>
            <li>
              Catch falling food items by positioning your pet underneath them.
            </li>
            <li>
              Good items (like Broccoli, Carrots, Bananas) decrease your
              pet&apos;s hunger.
            </li>
            <li>
              Bad items (like Oil Drums and Toilets) increase your pet&apos;s
              hunger—avoid them!
            </li>
            <li>If your pet&apos;s hunger reaches zero, the game ends.</li>
            <li>
              Try to catch as many good items as possible to keep your pet
              healthy and happy!
            </li>
          </ul>
        </StyledHowToPlay>
      )}
    </>
  );
}
