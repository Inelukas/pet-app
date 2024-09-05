import GameContainer from "@/components/GameCatchTheFood/GameContainer/GameContainer";

export default function GamePage({ petCollection }) {
  return <GameContainer pet={petCollection[0]} />;
}
