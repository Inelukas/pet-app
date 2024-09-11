import { useRouter } from "next/router";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 5px solid #000000;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.08);
  background-color: var(--secondary-color);
  width: 80vw;
  text-align: center;
  @media screen and (min-width: 600px) {
    width: 60vw;
    font-size: 2rem;
  }
`;
export default function Header() {
  const router = useRouter();
  let pageTitle;
  if (router.pathname === "/pet-list") {
    pageTitle = "Your Pet List";
  } else if (router.pathname.startsWith("/pet-details")) {
    pageTitle = "Pet Details";
  } else if (router.pathname === "/create") {
    pageTitle = "Create Your Pet";
  } else if (router.pathname === "/update") {
    pageTitle = "Update Your Pet";
  } else if (router.pathname === "/achievements") {
    pageTitle = "Achievements";
  }

  if (!pageTitle) return null;

  return (
    <HeaderContainer>
      <StyledHeader>{pageTitle}</StyledHeader>
    </HeaderContainer>
  );
}
