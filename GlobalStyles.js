import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
    --primary-color: #00712D;
    --secondary-color: #B9D685;
    --signal-color: #FF9100;
    --neutral-color: #FFFBE6;
    --text-color: black; 
    --create-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png");
    --game-image: url("https://www.transparenttextures.com/patterns/checkered-light-emboss.png");
    --primary-gradient: linear-gradient(135deg, #A8C9A6, #00712D, #004d00);
    --secondary-gradient: linear-gradient(135deg, #F0F5E1, #B9D685, #6FA150); 
    --signal-gradient: linear-gradient(135deg, #FFFFFF, #FF9100, #FF5722); 
    --neutral-gradient: linear-gradient(135deg, #FFFFFF, #F7E9D7, #D2BDA6);
    --graveyard-gradient: linear-gradient(135deg, #2c3e50, #4a6572, #95a5a6);
    --energy-gradient: linear-gradient(90deg, #ffff99, #ffff00, #ffd700);
    --happiness-gradient: linear-gradient(90deg, #ff69b4, #ffc0cb, #ffb6c1);
    --hunger-gradient: linear-gradient(90deg, #ff8c00, #ffa500, #ffd700);
    --health-gradient: linear-gradient(90deg, #76c893, #90ee90, #c7e9b0);
    --intelligence-gradient: linear-gradient(90deg, #87cefa, #add8e6, #b0e0e6); 
    --grey-gradient: linear-gradient(to right, #d3d3d3, #bfbfbf, #808080);
    --global-shadow: 3px 3px 3px #000; 
}

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


input, select, textarea {
    font-family: 'Ink Free', sans-serif; 
    color: black; 
    font-weight: bold; 
    background: var(--neutral-gradient); 
}


input:disabled, select:disabled, textarea:disabled {
    background: var(--grey-gradient); 
    
    cursor: not-allowed; 
}

body {
    background: ${({ $isGraveyard }) =>
      $isGraveyard ? "var(--graveyard-gradient)" : "var(--primary-gradient)"};
    background-size: cover; 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    font-family: Ink Free, Skia; 
}




@media screen and (min-width: 1200px) {
    width: 60%;
    margin: 0 20%;
}
`;
