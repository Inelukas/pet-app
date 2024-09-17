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
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  color: white;
  text-align: center;
`;

const Columns = styled.div`
  display: flex;
  justify-content: center;
  //width: 90%;
  max-width: 300px;

  @media (min-width: 600px) {
    width: 65%;
  }
`;

const Column = styled.div`
  flex: 1;
  margin: 0 20px;
  //  padding: 20px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  color: var(--text-color);
  font-size: 0.5rem;
  min-width: 80px;
`;

const ImageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ImageListItem = styled.li`
  margin-bottom: 20px;
  transform: ${(props) => (props.isSelected ? "scale(1.2)" : "scale(1)")};
  transition: transform 0.3s;
  cursor: ${(props) => (props.isUnlocked ? "pointer" : "not-allowed")};
  filter: ${(props) => (props.isUnlocked ? "none" : "grayscale(100%)")};
  opacity: ${(props) => (props.isUnlocked ? "1" : "0.5")};
`;

export default function AchievementsPage() {
  const [achievements, setAchievements] = useLocalStorageState("achievements", {
    defaultValue: {
      food: [false, false, false, false, false],
      play: [false, false, false, false, false],
      furniture: [false, false, false, false, false],
    },
  });

  const [selectedAchievements, setSelectedAchievements] = useLocalStorageState(
    "selectedAchievements",
    {
      defaultValue: {
        food: null,
        play: null,
        furniture: null,
      },
    }
  );

  useEffect(() => {
    try {
      const storedAchievements = JSON.parse(
        localStorage.getItem("achievements")
      );

      if (storedAchievements) {
        setAchievements(storedAchievements);
      } else {
        setAchievements({
          food: [false, false, false, false, false],
          play: [false, false, false, false, false],
          furniture: [false, false, false, false, false],
        });
      }
    } catch (error) {
      alert("Failed to load achievements. Please try again later.");
    }
  }, []);

  const handleSelect = (category, index) => {
    if (achievements[category][index]) {
      setSelectedAchievements((prev) => ({
        ...prev,
        [category]: prev[category] === index ? null : index,
      }));
    }
  };

  // Speichern der Auswahl in localStorage
  useEffect(() => {
    localStorage.setItem(
      "selectedAchievements",
      JSON.stringify(selectedAchievements)
    );
  }, [selectedAchievements]);

  const achievementImages = {
    food: [
      { src: "/achievements/brokkoli.png", alt: "Broccoli" },
      { src: "/achievements/ham.png", alt: "Ham" },
      { src: "/achievements/sandwich.png", alt: "Sandwich" },
      { src: "/achievements/burger.png", alt: "Burger" },
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
    <>
      <AchievementsContainer>
        <Columns>
          {Object.keys(achievementImages).map((category) => (
            <Column key={category}>
              <h1>{category}</h1>
              <ImageList>
                {achievementImages[category].map((item, index) => (
                  <ImageListItem
                    key={index}
                    isSelected={selectedAchievements[category] === index}
                    isUnlocked={achievements[category][index]}
                    onClick={() => handleSelect(category, index)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={50}
                      height={50}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Column>
          ))}
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
