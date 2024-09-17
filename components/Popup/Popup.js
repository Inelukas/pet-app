import React, { useEffect } from "react";
import styled from "styled-components";

// Popup Styled-Komponente
const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

// Popup-Komponente
const Popup = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Schließt das Popup nach 3 Sekunden
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return <PopupContainer show={show}>{message}</PopupContainer>;
};

export default Popup;
