import { useRouter } from "next/router";
import styled, { css } from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 0;
  width: 100%;
  height: 70px;
`;

const StyledHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  box-shadow: var(--global-shadow);
  margin: 20px;
  padding: 10px;
  border-radius: 10px;

  background: var(--secondary-gradient);
  width: 80vw;
  text-align: center;

  ${(props) =>
    props.$isGraveyard &&
    css`
      background: var(--graveyard-gradient);
      width: 40vw;
    `}

  @media screen and (min-width: 600px) {
    width: 60vw;
    font-size: 2rem;

    ${(props) =>
      props.$isGraveyard &&
      css`
        width: 40vw;
      `}
  }
`;

export default function Header() {
  const router = useRouter();
  let pageTitle;
  let isGraveyard = false;

  if (router.pathname === "/pet-list") {
    pageTitle = "Your Pet List";
  } else if (router.pathname.startsWith("/pet-details")) {
    pageTitle = "Pet Details";
  } else if (router.pathname === "/create") {
    pageTitle = "Create Your Pet";
  } else if (router.pathname === "/update") {
    pageTitle = "Update Your Pet";
  } else if (router.pathname === "/graveyard") {
    pageTitle = "Pet Cemetery";
    isGraveyard = true;
  } else if (router.pathname === "/instructions") {
    pageTitle = "Instructions";
  }

  if (!pageTitle) return null;

  return (
    <HeaderContainer>
      <StyledHeader $isGraveyard={isGraveyard}>{pageTitle}</StyledHeader>
    </HeaderContainer>
  );
}
