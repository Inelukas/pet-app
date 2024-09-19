import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const slideIn = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: "0%", opacity: 1, transition: { duration: 0.5 } },
};

const slideOut = {
  exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
};

const progressBarAnimation = keyframes`
  0% { width: 100%; }
  100% { width: 0%; }
`;

const ToastMessageContainer = styled(motion.div)`
  max-width: 300px;
  width: 80%;
  background: var(--signal-gradient);
  padding: 15px;
  border: 2px solid #f5c6c6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: var(--global-shadow);
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #f5c6c6;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #28a745;
  animation: ${progressBarAnimation} 3s linear forwards;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const MessageText = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
  margin: 0;
  white-space: nowrap;
`;

export default function ToastMessage({ messageContent }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastMessageContainer
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      variants={{ ...slideIn, ...slideOut }}
    >
      <MessageWrapper>
        <MessageText>{messageContent}</MessageText>
      </MessageWrapper>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
    </ToastMessageContainer>
  );
}
