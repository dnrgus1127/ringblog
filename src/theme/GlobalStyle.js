import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        color : ${({ theme }) => theme.color};
        font-family: "Noto Sans KR", sans-serif;
    }

    body {
        background-color:  ${({ theme }) => theme.bgColor};
    }
    a{
        text-decoration: none;
    }
    img {
        margin: 0;
        padding: 0;
    }
    input {
        outline: none;
        border: none;
        background: none;
    }

    button {
        background: none;
        outline: none;
        border: none;
        cursor: pointer;
    }

    textarea {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        resize: none;
        outline: none;
    }

`;

export default GlobalStyle;
