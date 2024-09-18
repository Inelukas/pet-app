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
  transition: opacity 0.5s ease-in-out;
`;

// Popup-Komponente
function Popup({ message }) {
  return <PopupContainer> {message}</PopupContainer>;
}

export default Popup;
