import styled from "styled-components";
import Image from "next/image";

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

export default function AchievementsPage() {
  return (
    <>
      <AchievementsContainer>
        <Columns>
          <Column>
            <h1>Food</h1>
            <ImageList>
              <ImageListItem>
                <Image
                  src="/achievements/brokkoli.png"
                  alt="Image of a broccoli"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/ham.png"
                  alt="Image of fried ham hock"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/Sandwich.png"
                  alt="Image of a sandwich"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/Burger.png"
                  alt="Image of a Cheeseburger"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/cake.png"
                  alt="Image of a piece of cake"
                  width={100}
                  height={100}
                />
              </ImageListItem>
            </ImageList>
          </Column>
          <Column>
            <h1>Play</h1>
            <ImageList>
              <ImageListItem>
                <Image
                  src="/achievements/twig no bg.png"
                  alt="Image of a twig"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/small ball no bg.png"
                  alt="Image of a small ball"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/yarn.png"
                  alt="Image of a ball of yern"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/rattel.png"
                  alt="Image of a rattel"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/teddy.png"
                  alt="Image of a teddy bear"
                  width={100}
                  height={100}
                />
              </ImageListItem>
            </ImageList>
          </Column>
          <Column>
            <h1>Furniture</h1>
            <ImageList>
              <ImageListItem>
                <Image
                  src="/achievements/doghouse.png"
                  alt="Image of a dog house"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/litter_box.png"
                  alt="Image of a litter boc"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/nice doghouse.png"
                  alt="Image of a luxury dog house/castle"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/litter_box_throne.png"
                  alt="Image of a litter box throne"
                  width={100}
                  height={100}
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  src="/achievements/hammock.png"
                  alt="Image of a hammock"
                  width={100}
                  height={100}
                />
              </ImageListItem>
            </ImageList>
          </Column>
        </Columns>
      </AchievementsContainer>
    </>
  );
}
