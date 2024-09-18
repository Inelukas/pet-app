import styled from "styled-components";

const StyledScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  position: absolute;
  bottom: -30px;
  width: 100%;
  font-size: 0.8rem;
  font-weight: 800;
`;

const StyledCountdown = styled.span`
  font-size: 2rem;
  background: var(--signal-gradient);
  border-radius: 100px;
  padding: 5px;
  position: absolute;
  right: -25px;
  bottom: -30px;
  box-shadow: var(--global-shadow);
`;

export default function ScoreContainer({
  score,
  highscore,
  countdown,
  tapping,
  catchfood,
}) {
  return (
    <StyledScoreContainer>
      <span>
        {catchfood ? "Items caught: " : "Current Score: "} {score}
      </span>
      {!catchfood && <span>Highscore: {highscore}</span>}
      {tapping && <StyledCountdown>{countdown}</StyledCountdown>}
    </StyledScoreContainer>
  );
}
