import styled from "styled-components";
import { GameButton } from "../ButtonContainer/ButtonContainer";
import Link from "next/link";
import Image from "next/image";
import backIcon from "../../../public/assets/back.png";

const Wrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: 600px;
  justify-content: center;
  border: 2px solid black;
  background-color: var(--neutral-color);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export default function SummaryScreen({ itemsCaught, timeTaken }) {
  return (
    <Wrapper>
      <SummaryContainer>
        <h2>Your pet has been fed!</h2>
        <p>Items caught: {itemsCaught}</p>
        <p>Time taken: {timeTaken} seconds</p>
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
