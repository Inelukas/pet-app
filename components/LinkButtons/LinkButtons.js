import styled from "styled-components";

export const ListPageWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: calc(50% - 45vw);
  width: 4rem;
  height: 4rem;
  box-shadow: 2px 2px #000000;
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
  opacity: 75%;
  @media screen and (min-width: 1024px) {
    right: calc(50% - 20vw);
  }

  @media screen and (min-width: 667px) {
    right: calc(50% - 40vw);

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
`;

export const DetailPageWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: calc(50% - 45vw);
  width: 4rem;
  height: 4rem;
  box-shadow: 2px 2px #000000;
  background-color: lightblue;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
  opacity: 75%;
  @media screen and (min-width: 1024px) {
    left: calc(50% - 20vw);
  }

  @media screen and (min-width: 667px) {
    left: calc(50% - 40vw);

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
`;

export const GardenPageWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: calc(50% - 45vw);
  width: 4rem;
  height: 4rem;
  box-shadow: 2px 2px #000000;
  background-color: lightgreen;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
  opacity: 75%;
  @media screen and (min-width: 1200px) {
    left: calc(50% - 20vw);
  }

  @media screen and (min-width: 600px) {
    left: calc(50% - 40vw);
    &:hover {
      transform: scale(1.2);
    }

    &:active {
      background-color: var(--secondary-color);
    }
  }
`;
