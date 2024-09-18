import React, { useEffect } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--signal-gradient);

  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
`;

function Popup({ message }) {
  return <PopupContainer> {message}</PopupContainer>;
}

export default Popup;
