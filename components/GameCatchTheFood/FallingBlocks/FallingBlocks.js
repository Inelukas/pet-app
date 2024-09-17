import { motion } from "framer-motion";
import styled from "styled-components";

const Block = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 30px;
`;

export default function FallingBlocks({ item }) {
  return (
    <Block
      initial={{ y: item.y, x: item.x }}
      animate={{ y: item.y }}
      transition={{ duration: 0.05, ease: "linear" }}
    >
      {item.icon}
    </Block>
  );
}
