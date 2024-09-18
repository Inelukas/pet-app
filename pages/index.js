import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

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

export const StyledButtonLink = styled(StyledLink)`
  border-radius: 10px;

  font-size: small;
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

export const StyledStartSpan = styled.span`
  font-size: large;
  background: linear-gradient(90deg, #d5ed9f, #ff9100, #fffbe6);
  background-clip: border-box;
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
        width={500}
        height={500}
        priority
      />
      <StyledButtonLink href={buttonLink}>{buttonText}</StyledButtonLink>
      <StyledStartSpan>
        Create your own Pet - Feed it, train it, keep it happy!
      </StyledStartSpan>
      <MusicPlayer />
    </StyledStartPage>
  );
}
