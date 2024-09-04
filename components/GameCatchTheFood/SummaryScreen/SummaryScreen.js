import styled from "styled-components";

const Wrapper = styled.div`
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

export default function SummaryScreen({ itemsCaught, timeTaken }) {
  return (
    <Wrapper>
      <SummaryContainer>
        <h2>Your pet has been fed!</h2>
        <p>Items caught: {itemsCaught}</p>
        <p>Time taken: {timeTaken} seconds</p>
      </SummaryContainer>
    </Wrapper>
  );
}
