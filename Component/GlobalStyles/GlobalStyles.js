import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: Arial, sans-serif;
    --primary-color: #00712D ;
    --secondary-color: #D5ED9F;
    --signal-color: #FF9100;
    --neutral-color: #FFFBE6;
    --text-color: #000000; 
  }

  :html {
    width: 100%;
    height: 100%;
      }
`;

export default GlobalStyle;
