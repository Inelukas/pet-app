import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";

export const StyledStartPage = styled.section`
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default function StartPage() {
  return (
    <StyledStartPage>
      <Image
        alt="Pet App Logo"
        src="/images/logo.webp"
        width={200}
        height={200}
      />
      <StyledLink href="/create">Go to Garden / Create Pet</StyledLink>
    </StyledStartPage>
  );
}
