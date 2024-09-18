import styled from "styled-components";
import { GameButton } from "../ButtonContainer/ButtonContainer";
import Link from "next/link";
import Image from "next/image";
import backIcon from "../../../public/assets/back.png";

const Wrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 400px;
  justify-content: center;

  border-radius: 20px;
  background: var(--neutral-gradient);
  box-shadow: var(--global-shadow);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export default function SummaryScreen({
  itemsCaught,
  timeTaken,
  catchfood,
  snake,
  tapping,
}) {
  return (
    <Wrapper>
      <SummaryContainer>
        {catchfood && (
          <>
            <h2>Your pet has been fed!</h2>
            <p>Items caught: {itemsCaught}</p>
            <p>Time taken: {timeTaken} seconds</p>
            <p>Your pet&apos;s Intelligence has increased</p>
          </>
        )}
        {snake && (
          <>
            <h2>Your pet has built a happy family!</h2>
            <p>Number of children: {itemsCaught}</p>
            {itemsCaught >= 5 && (
              <p>Your pet&apos;s Intelligence has increased</p>
            )}
          </>
        )}
        {tapping && (
          <>
            <h2>Your pet has been charged!</h2>
            <p>Total count: {itemsCaught}</p>
            {itemsCaught >= 5 && (
              <p>Your pet&apos;s Intelligence has increased</p>
            )}
          </>
        )}
        <ButtonContainer>
          <Link href="/garden">
            <GameButton>
              <Image src={backIcon} alt="Back Icon" width={30} />
            </GameButton>
          </Link>
        </ButtonContainer>
      </SummaryContainer>
    </Wrapper>
  );
}
