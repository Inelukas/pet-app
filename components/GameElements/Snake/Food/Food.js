import styled from "styled-components";
import Image from "next/image";

const StyledFood = styled.div`
  display: grid;
  place-content: center;
  position: absolute;
  width: 30px;
  height: 30px;
  top: ${({ $topPosition }) => $topPosition};
  left: ${({ $leftPosition }) => $leftPosition};
  z-index: 2;
`;

export default function Food({ foodPosition, pet }) {
  return (
    <StyledFood
      $topPosition={`${foodPosition.y}px`}
      $leftPosition={`${foodPosition.x}px`}
    >
      <Image
        src={pet?.picture}
        alt={pet?.name || "A cute pet"}
        width={20}
        height={20}
        quality={100}
      />
    </StyledFood>
  );
}
