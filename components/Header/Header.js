import { useRouter } from "next/router";
import styled from "styled-components";
const StyledHeader = styled.header`
  font-size: 35px;
  font-weight: bold;
  color: var(--text-color);
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 5px solid #000000;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.08);
  background-color: var(--secondary-color);
  width: 60vw;
  text-align: center;
  @media screen and (max-width: 1024px) {
    width: 70vw;
  }
  @media screen and (max-width: 667px) {
    width: 80%;
  }
`;
const HeaderContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Header() {
  const router = useRouter();
  let title;
  if (router.pathname === "/") {
    title = "Your Pet Garden";
  } else if (router.pathname === "/PetList") {
    title = "Pet List";
  } else if (router.pathname === "/CreatePet") {
    title = "Create your Pet";
  }
  return (
    <HeaderContainer>
      <StyledHeader>{title}</StyledHeader>
    </HeaderContainer>
  );
}
