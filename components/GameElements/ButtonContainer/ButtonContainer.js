import styled from "styled-components";
import Link from "next/link";
import instructionsIcon from "../../../public/assets/info.png";
import backIcon from "../../../public/assets/back.png";
import replayIcon from "../../../public/assets/replay.png";
import startIcon from "../../../public/assets/start.png";
import Image from "next/image";
import ArrowButtons from "../ArrowButtons/ArrowButtons";

const WholeButtonContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 220px;
  padding-top: 80px;

  @media screen and (min-width: 600px) {
    height: 300px;
  }
  @media screen and (min-width: 1200px) {
    height: 400px;
  }
`;

const NavButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 350px;
  bottom: 10px;
  @media screen and (min-width: 600px) {
    width: 500px;
  }
`;

export const GameButton = styled.button`
  width: 45px;
  height: 30px;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 10px;
  margin: 0 6px;
  background-color: ${({ $color }) =>
    $color ? $color : "var(--signal-color)"};
`;

export default function ButtonContainer({
  onDirection,
  gameOn,
  instructions,
  onNewGame,
  onInstructions,
  onReset,
  tapping = false,
  snake = false,
  onStart,
  hide,
}) {
  return (
    <WholeButtonContainer>
      {snake && !gameOn ? (
        <h1>Game Over</h1>
      ) : (
        !tapping && (
          <ArrowButtons onDirection={onDirection} gameOn={gameOn} hide={hide} />
        )
      )}
      <NavButtonContainer>
        <Link href="/garden">
          <GameButton>
            <Image src={backIcon} alt="Back Icon" width={30} />
          </GameButton>
        </Link>
        {!snake && (
          <GameButton
            onClick={
              !gameOn || (!snake && !tapping) ? onStart : () => onReset(false)
            }
          >
            <Image
              src={!gameOn || (!snake && !tapping) ? startIcon : replayIcon}
              alt={
                !gameOn || (!snake && !tapping) ? "Start Icon" : "Replay Icon"
              }
              width={30}
            />
          </GameButton>
        )}
        <GameButton
          $color="#4caf50"
          onClick={() => {
            (snake && gameOn) || !snake
              ? onInstructions(!instructions)
              : onNewGame();
          }}
        >
          <Image
            src={(snake && gameOn) || !snake ? instructionsIcon : replayIcon}
            alt={
              (snake && gameOn) || !snake ? "Instructions Icon" : "Replay Icon"
            }
            width={30}
          />
        </GameButton>
      </NavButtonContainer>
    </WholeButtonContainer>
  );
}
