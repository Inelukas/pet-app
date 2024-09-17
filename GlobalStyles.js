import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
    --primary-color: #00712D;
    --secondary-color: #D5ED9F;
    --signal-color: #FF9100;
    --neutral-color: #FFFBE6;
    --text-color: #000000; 
    --create-image: url("https://www.transparenttextures.com/patterns/black-paper.png");
    --game-image: url("https://www.transparenttextures.com/patterns/checkered-light-emboss.png")
  }

 *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }



  body {
    width: auto;
    height: auto;
    background-color: var(--primary-color);
    background-image: var(--create-image);
    @media screen and (min-width: 1200px) {
      width: 60%;
    margin: 0 20%;
  }
      }
`;
