import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

const AvatarContainer = styled(motion.div)`
  width: 40px;
  height: 40px;
  font-size: 30px;
  z-index: 1;
`;

export default function PlayerAvatar({ x, picture, name }) {
  return (
    <AvatarContainer
      animate={{ x }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
    >
      <Image
        src={picture}
        alt={name}
        width={30}
        height={30}
        objectFit="cover"
        quality={100}
      />
    </AvatarContainer>
  );
}
