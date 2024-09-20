import styled from "styled-components";

const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  color: white;
  text-align: center;
  padding-top: 100px;
`;

const Columns = styled.div`
  display: flex;
  justify-content: center;
  max-width: 300px;
  @media (min-width: 600px) {
    width: 65%;
  }
`;

const Column = styled.div`
  flex: 1;
  margin: 0 20px;
  background: var(--signal-gradient);
  border-radius: 10px;
  color: var(--text-color);
  font-size: 0.5rem;
  min-width: 80px;
  box-shadow: var(--global-shadow);
`;

const ColumnHeading = styled.h1`
  margin: 10px 0;
  text-transform: capitalize;
`;

const ImageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ImageListItem = styled.li`
  margin-bottom: 20px;
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.2)" : "scale(1)")};
  transition: transform 0.3s;
  cursor: ${({ $isUnlocked }) => ($isUnlocked ? "pointer" : "not-allowed")};
  filter: ${({ $isUnlocked }) => ($isUnlocked ? "none" : "grayscale(100%)")};
  opacity: ${({ $isUnlocked }) => ($isUnlocked ? "1" : "0.5")};
`;

export default function AchievementsPage({ achievements }) {
  const achievementImages = {
    food: [
      { src: "/achievements/brokkoli.png", alt: "Broccoli" },
      { src: "/achievements/ham.png", alt: "Ham" },
      { src: "/achievements/Sandwich.png", alt: "Sandwich" },
      { src: "/achievements/Burger.png", alt: "Burger" },
      { src: "/achievements/cake.png", alt: "Cake" },
    ],
    play: [
      { src: "/achievements/twig.png", alt: "Twig" },
      { src: "/achievements/ball.png", alt: "Ball" },
      { src: "/achievements/yarn.png", alt: "Yarn" },
      { src: "/achievements/rattle.png", alt: "Rattle" },
      { src: "/achievements/teddy.png", alt: "Teddy" },
    ],
    furniture: [
      { src: "/achievements/doghouse.png", alt: "Dog House" },
      { src: "/achievements/litter_box.png", alt: "Litter Box" },
      { src: "/achievements/dogcastle.png", alt: "Castle" },
      { src: "/achievements/litter_box_throne.png", alt: "Throne" },
      { src: "/achievements/hammock.png", alt: "Hammock" },
    ],
  };

  return (
    <AchievementsContainer>
      <Columns>
        {Object.keys(achievementImages).map((category) => (
          <Column key={category}>
            <ColumnHeading>{category}</ColumnHeading>
            <ImageList>
              {achievementImages[category].map((item, index) => (
                <ImageListItem
                  key={item.alt}
                  $isUnlocked={achievements[category][index]}
                >
                  <img src={item.src} alt={item.alt} width={50} height={50} />
                </ImageListItem>
              ))}
            </ImageList>
          </Column>
        ))}
      </Columns>
    </AchievementsContainer>
  );
}
