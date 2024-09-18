import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import createIcon from "../../public/assets/create.png";
import listIcon from "../../public/assets/list.png";
import detailsIcon from "../../public/assets/details.png";
import achievementsIcon from "../../public/assets/trophy.png";
import gardenIcon from "../../public/assets/garden.png";
import graveyardIcon from "../../public/assets/graveyard.png";

const PageButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 100;

  @media screen and (min-width: 1200px) {
    max-width: 800px;
  }
`;

const PageButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: ${({ $right }) => ($right ? $right : "auto")};
  left: ${({ $left }) => ($left ? $left : "auto")};
  top: ${({ $top }) => ($top ? $top : "auto")};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: var(--global-shadow);

  background: var(--secondary-gradient);

  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--signal-gradient);
    box-shadow: var(--global-shadow);
    transform: scale(1.1);
  }
  &:active {
    background: var(--secondary-gradient);
  }
`;

const StyledImage = styled(Image)`
  position: relative;
  top: 4px;
`;
export default function PageButtons({ router, activePet }) {
  return (
    <PageButtonContainer>
      {(router.pathname === "/pet-list" ||
        router.pathname === "/achievements" ||
        router.pathname.includes("/pet-details")) && (
        <PageButton $color={"lightgreen"} $left={"10px"}>
          <Link href="/garden" aria-label="A golf hole indicating the Garden">
            <StyledImage src={gardenIcon} alt="Garden Icon" width={40} />
          </Link>
        </PageButton>
      )}
      {activePet && router.pathname === "/garden" && (
        <>
          <PageButton $color={"lightblue"} $left={"10px"}>
            <Link
              href={{
                pathname: `/pet-details/${activePet.id}`,
              }}
              aria-label="Magnifying Glass indicating Details"
            >
              <StyledImage src={detailsIcon} alt="Details Icon" width={40} />
            </Link>
          </PageButton>
          <PageButton $color={"green"} $top={"-98vh"} $right={"100px"}>
            <Link
              href={{
                pathname: `/achievements`,
              }}
              aria-label="Pokal indicating Achievements"
            >
              <StyledImage
                src={achievementsIcon}
                alt="Achievements Icon"
                width={40}
              />
            </Link>
          </PageButton>
        </>
      )}
      {(router.pathname === "/garden" ||
        router.pathname === "/graveyard" ||
        router.pathname.includes("/pet-details")) && (
        <PageButton $color={"red"} $right={"10px"}>
          <Link href="/pet-list" aria-label="Staple of Books indicating List">
            <StyledImage src={listIcon} alt="List Icon" width={40} />
          </Link>
        </PageButton>
      )}
      {router.pathname === "/pet-list" && (
        <>
          <PageButton $color={"orange"} $right={"45%"}>
            <Link href="/create" aria-label="Create Icon">
              <StyledImage src={createIcon} alt="Create Icon" width={40} />
            </Link>
          </PageButton>
          <PageButton $color={"grey"} $right={"10px"}>
            <Link href="/graveyard" aria-label="Coffing indicating Graveyard">
              <StyledImage
                src={graveyardIcon}
                alt="Graveyard Icon"
                width={40}
              />
            </Link>
          </PageButton>
        </>
      )}
    </PageButtonContainer>
  );
}
