import { motion } from "framer-motion";
import styled from "styled-components";

const AvatarContainer = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 30px;
  bottom: 30px;
  z-index: 1;
`;

export default function PlayerAvatar({ x }) {
  return (
    <AvatarContainer
      animate={{ x }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      🐶
    </AvatarContainer>
  );
}
