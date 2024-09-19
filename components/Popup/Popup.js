import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  bottom: 85px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--signal-gradient);
  box-shadow: var(--global-shadow);
  font-size: x-large;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  white-space: nowrap;
`;

function Popup({ message }) {
  return <PopupContainer>{message} </PopupContainer>;
}

export default Popup;
