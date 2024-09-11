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
            </ImageList>
          </Column>
          <Column>
            <h1>Furniture</h1>
          </Column>
        </Columns>
      </AchievementsContainer>
    </>
  );
}
