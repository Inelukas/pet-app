import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import createIcon from "../../public/assets/create.png";

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
  width: 4rem;
  height: 4rem;
  box-shadow: 2px 2px #000000;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
  opacity: 75%;
`;

export default function PageButtons({ router, activePet }) {
  return (
    <PageButtonContainer>
      {(router.pathname === "/pet-list" ||
        router.pathname.includes("/pet-details")) && (
        <PageButton $color={"lightgreen"} $left={"10px"}>
          <Link href="/garden" aria-label="A golf hole indicating the Garden">
            ⛳
          </Link>
        </PageButton>
      )}
      {activePet && router.pathname === "/garden" && (
        <PageButton $color={"lightblue"} $left={"10px"}>
          <Link
            href={{
              pathname: `/pet-details/${activePet.id}`,
            }}
            aria-label="Magnifying Glass indicating Details"
          >
            🔎
          </Link>
        </PageButton>
      )}
      {(router.pathname === "/garden" ||
        router.pathname === "/graveyard" ||
        router.pathname.includes("/pet-details")) && (
        <PageButton $color={"red"} $right={"10px"}>
          <Link href="/pet-list" aria-label="Staple of Books indicating List">
            📚
          </Link>
        </PageButton>
      )}
      {router.pathname === "/pet-list" && (
        <>
          <PageButton $color={"orange"} $right={"45%"}>
            <Link href="/create" aria-label="Create Icon">
              <Image src={createIcon} alt="Create Icon" width={30} />
            </Link>
          </PageButton>
          <PageButton $color={"grey"} $right={"10px"}>
            <Link href="/graveyard" aria-label="Coffing indicating Graveyard">
              ⚰️
            </Link>
          </PageButton>
        </>
      )}
    </PageButtonContainer>
  );
}
