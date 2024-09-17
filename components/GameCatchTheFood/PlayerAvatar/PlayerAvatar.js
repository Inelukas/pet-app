import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useRef } from "react";

const AvatarContainer = styled(motion.div)`
  width: 40px;
  height: 40px;
  font-size: 30px;
  z-index: 1;
  outline: none;
`;

export default function PlayerAvatar({ x, picture, name, onDirection }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.focus();
    }
  }, [x]);

  return (
    <AvatarContainer
      ref={playerRef}
      tabIndex={0}
      onKeyDown={onDirection}
      onBlur={() => playerRef.current.focus()}
      animate={{ x }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
    >
      <Image src={picture} alt={name} width={30} height={30} quality={100} />
    </AvatarContainer>
  );
}
