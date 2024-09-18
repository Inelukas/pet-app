import React, { useEffect } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--signal-gradient);
  width: 150px;
  height: 50px;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  white-space: nowrap;
`;

function Popup({ message }) {
  return <PopupContainer> {message}</PopupContainer>;
}

export default Popup;