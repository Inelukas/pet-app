import styled from "styled-components";
import StyledLink from "@/components/StyledLink/StyledLink";

export const StyledStartPage = styled.section`
  background-color: var(--primary-color);
`;

export default function StartPage() {
  return (
    <StyledStartPage>
      <StyledLink href="/create">Go to Garden / Create Pet </StyledLink>
    </StyledStartPage>
  );
}
