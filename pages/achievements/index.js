import styled from "styled-components";
import Image from "next/image";
import useLocalStorageState from "use-local-storage-state";
import {
  GardenPageWrapper,
  ListPageWrapper,
} from "@/components/LinkButtons/LinkButtons";
import { useEffect } from "react";
import Link from "next/link";

const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-align: center;
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  width: 65%;
  max-width: 1200px;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 20px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  color: var(--text-color);
`;

const ImageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ImageListItem = styled.li`
  margin-bottom: 20px;
`;

const GrayedOutImageListItem = styled(ImageListItem)`
  filter: grayscale(100%);
  opacity: 0.5;
`;

function ImageItem({ src, alt, unlocked }) {
  return (
    <>
      {unlocked ? (
        <ImageListItem className={!unlocked ? "grayed-out" : ""}>
          <Image src={src} alt={alt} width={100} height={100} />
        </ImageListItem>
      ) : (
        <GrayedOutImageListItem>
          <Image src={src} alt={alt} width={100} height={100} />
        </GrayedOutImageListItem>
      )}
    </>
  );
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useLocalStorageState("achievements", {
    defaultValue: {
      food: [false, false, false, false, false],
      play: [false, false, false, false, false],
      furniture: [false, false, false, false, false],
    },
  });

  useEffect(() => {
    const storedAchievements = JSON.parse(
      localStorage.getItem("achievements")
    ) || {
      food: [false, false, false, false, false],
      play: [false, false, false, false, false],
      furniture: [false, false, false, false, false],
    };
    setAchievements(storedAchievements);
  }, []);

  useEffect(() => {
    console.log(achievements.play[0]); // Sollte true sein, wenn der Stock freigeschaltet ist
  }, [achievements]);

  return (
    <>
      <AchievementsContainer>
        <Columns>
          <Column>
            <h1>Food</h1>
            <ImageList>
              <ImageListItem>
                <ImageItem
                  src="/achievements/brokkoli.png"
                  alt="Image of a broccoli"
                  unlocked={achievements.food[0]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/ham.png"
                  alt="Image of fried ham hock"
                  unlocked={achievements.food[1]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/Sandwich.png"
                  alt="Image of a sandwich"
                  unlocked={achievements.food[2]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/Burger.png"
                  alt="Image of a Cheeseburger"
                  unlocked={achievements.food[3]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/cake.png"
                  alt="Image of a piece of cake"
                  unlocked={achievements.food[4]}
                />
              </ImageListItem>
            </ImageList>
          </Column>
          <Column>
            <h1>Play</h1>
            <ImageList>
              <ImageListItem>
                <ImageItem
                  src="/achievements/twig no bg.png"
                  alt="Image of a twig"
                  unlocked={achievements.play[0]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/small ball no bg.png"
                  alt="Image of a small ball"
                  unlocked={achievements.play[1]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/yarn.png"
                  alt="Image of a ball of yern"
                  unlocked={achievements.play[2]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/rattel.png"
                  alt="Image of a rattel"
                  unlocked={achievements.play[3]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/teddy.png"
                  alt="Image of a teddy bear"
                  unlocked={achievements.play[4]}
                />
              </ImageListItem>
            </ImageList>
          </Column>
          <Column>
            <h1>Furniture</h1>
            <ImageList>
              <ImageListItem>
                <ImageItem
                  src="/achievements/doghouse.png"
                  alt="Image of a dog house"
                  unlocked={achievements.furniture[0]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/litter_box.png"
                  alt="Image of a litter boc"
                  unlocked={achievements.furniture[1]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/nice doghouse.png"
                  alt="Image of a luxury dog house/castle"
                  unlocked={achievements.furniture[2]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/litter_box_throne.png"
                  alt="Image of a litter box throne"
                  unlocked={achievements.furniture[3]}
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/hammock.png"
                  alt="Image of a hammock"
                  unlocked={achievements.furniture[4]}
                />
              </ImageListItem>
            </ImageList>
          </Column>
        </Columns>
      </AchievementsContainer>
      <GardenPageWrapper>
        <Link href="/garden" aria-label="A golf hole indicating the Garden">
          ⛳
        </Link>
      </GardenPageWrapper>
      <ListPageWrapper>
        <Link href="/pet-list" aria-label="Staple of Books indicating List">
          📚
        </Link>
      </ListPageWrapper>
    </>
  );
}
