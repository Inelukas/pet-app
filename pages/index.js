import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";

export const StyledStartPage = styled.section`
  background-image: var(--create-image);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 15px;
  gap: 75px;
`;

export const StyledStartSpan = styled.span`
  font-size: xx-large;
  background: linear-gradient(90deg, #d5ed9f, #ff9100, #fffbe6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
`;

export default function StartPage({ petCollection }) {
  const buttonText = petCollection.length > 0 ? "Go to Garden" : "Create Pet";
  const buttonLink = petCollection.length > 0 ? "/create" : "/create"; // Link to Pet Garden will be inserted here later

  console.log(petCollection.length);

  return (
    <StyledStartPage>
      <Image
        alt="Pet App Logo"
        src="/images/logo.png"
        width={500}
        height={500}
      />
      <StyledLink href={buttonLink}>{buttonText}</StyledLink>
      <StyledStartSpan>
        Create your own Pet - Feed it, train it, keep it happy!
      </StyledStartSpan>
    </StyledStartPage>
  );
}
