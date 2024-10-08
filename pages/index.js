import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";

export const StyledStartPage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  gap: 30px;
  position: fixed;
`;

export const StyledImage = styled(Image)`
  width: 400px;
  height: 400px;

  @media (min-width: 600px) {
    width: 450px;
    height: 450px;
  }

  @media (min-width: 900px) {
    width: 500px;
    height: 500px;
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
    font-size: 1.6rem;
    padding: 40px 90px;
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

export default function StartPage({ petCollection }) {
  const buttonText = petCollection?.length > 0 ? "Go to Garden" : "Create Pet";
  const buttonLink = petCollection?.length > 0 ? "/garden" : "/create";

  return (
    <StyledStartPage>
      <StyledImage
        alt="Pet App Logo"
        src="/assets/images/app-logo.png"
        width={350}
        height={350}
        priority
      />
      <StartButtonContainer>
        <StartPageGardenLink href={buttonLink}>
          {buttonText}
        </StartPageGardenLink>
        <InstructionsLink href="/instructions">Instructions</InstructionsLink>
      </StartButtonContainer>
    </StyledStartPage>
  );
}
