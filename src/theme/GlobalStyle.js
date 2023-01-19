import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        color : ${({ theme }) => theme.color};
    }
    body {
        background-color:  ${({ theme }) => theme.bgColor};
    }
    a{
        text-decoration: none;
    }
`;

export default GlobalStyle;
