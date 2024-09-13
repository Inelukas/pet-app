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

function ImageItem({ src, alt }) {
  return (
    <ImageListItem>
      <Image src={src} alt={alt} width={100} height={100} />
    </ImageListItem>
  );
}

export default function AchievementsPage() {
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
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/ham.png"
                  alt="Image of fried ham hock"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/Sandwich.png"
                  alt="Image of a sandwich"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/Burger.png"
                  alt="Image of a Cheeseburger"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/cake.png"
                  alt="Image of a piece of cake"
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
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/small ball no bg.png"
                  alt="Image of a small ball"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/yarn.png"
                  alt="Image of a ball of yern"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/rattel.png"
                  alt="Image of a rattel"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/teddy.png"
                  alt="Image of a teddy bear"
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
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/litter_box.png"
                  alt="Image of a litter boc"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/nice doghouse.png"
                  alt="Image of a luxury dog house/castle"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/litter_box_throne.png"
                  alt="Image of a litter box throne"
                />
              </ImageListItem>
              <ImageListItem>
                <ImageItem
                  src="/achievements/hammock.png"
                  alt="Image of a hammock"
                />
              </ImageListItem>
            </ImageList>
          </Column>
        </Columns>
      </AchievementsContainer>
    </>
  );
}
