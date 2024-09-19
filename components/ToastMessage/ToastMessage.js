import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import cancelIcon from "../../public/assets/cancel.png";
import Image from "next/image";

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
  box-shadow: var (--global-shadow);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--neutral-gradient);
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: var(--primary-gradient);
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

  margin: 0;
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--secondary-gradient);
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--primary-gradient);
    transform: scale(1.1);
  }
`;

export default function ToastMessage({ messageContent, onToastMessage }) {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
    onToastMessage();
  };

  return (
    <ToastMessageContainer
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      variants={{ ...slideIn, ...slideOut }}
    >
      <MessageWrapper>
        <MessageText>{messageContent}</MessageText>
        <DeleteButton onClick={handleClose}>
          <Image src={cancelIcon} alt={"Delete Icon"} height={30} width={30} />
        </DeleteButton>
      </MessageWrapper>
      <ProgressBarContainer>
        <ProgressBar />
      </ProgressBarContainer>
    </ToastMessageContainer>
  );
}
