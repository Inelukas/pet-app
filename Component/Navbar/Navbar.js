import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--neutral-color);
  border-radius: 8px;
`;

const NavButton = styled.button`
  background-color: var(--neutral-color);
  color: var(--text-color);
`;

const DetailButton = styled.button`
  background-color: var(--neutral-color);
  color: var(--text-color);
`;

const Navbar = ({ onPrev, onNext, onDetailsPage }) => {
  return (
    <NavbarContainer>
      <NavButton onClick={onPrev}>Prev Pet</NavButton>
      <DetailButton onClick={onDetailsPage}>Open Details</DetailButton>
      <NavButton onClick={onNext}>Next Pet</NavButton>
    </NavbarContainer>
  );
};

export default Navbar;
