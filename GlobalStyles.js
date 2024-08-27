import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
    --primary-color: #00712D;
    --secondary-color: #D5ED9F;
    --signal-color: #FF9100;
    --neutral-color: #FFFBE6;
    --text-color: #000000; 
  }

 *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }



  body {
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
      }
`;