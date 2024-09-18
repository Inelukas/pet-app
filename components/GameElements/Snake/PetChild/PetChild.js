import styled from "styled-components";
import Image from "next/image";

const StyledChild = styled.div`
  display: grid;
  place-content: center;
  position: absolute;
  width: 30px;
  height: 30px;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  transform: ${({ $gameOn }) => ($gameOn ? "rotate(0deg)" : "rotate(180deg)")};
  font-size: 1rem;
  border: black;
`;

export default function PetChild({ childPosition, gameOn, pet }) {
  return (
    <StyledChild
      $topPosition={`${childPosition.y}px`}
      $leftPosition={`${childPosition.x}px`}
      $gameOn={gameOn}
    >
      <Image
        src={pet?.picture}
        alt={pet?.name || "A cute pet"}
        width={15}
        height={15}
        quality={100}
      />
    </StyledChild>
  );
}
