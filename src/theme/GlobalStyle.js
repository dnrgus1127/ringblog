import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        color : ${({ theme }) => theme.color};
    }

`;

export default GlobalStyle;
