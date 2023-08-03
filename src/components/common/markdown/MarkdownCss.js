import styled from "styled-components";

// TODO textArea에 마크다운 입력 시 강조 표시 없음
const MarkdownCss = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  textarea,
  input {
    white-space: pre-wrap;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 3rem 0;
  }

  strong {
    color: ${({ theme }) => theme.pointColor};
  }

  blockquote,
  pre {
    margin: 2rem 0;
  }

  hr {
    border: 1px solid ${({ theme }) => theme.lineColor};
    margin: 3rem 0;
  }

  ul {
    margin: 2rem;
  }
  & > ul {
    list-style-type: square;
    list-style-position: inside;
  }
  & > ul > li {
    margin: 2rem 0;
  }
  & > ul > li > ul {
    list-style-type: circle;
  }

  p {
    font-size: 1.8rem;
    margin: 1.8rem 0;
    width: 100%;
    word-break: break-all;
  }
  ul {
    font-size: 1.8rem;
  }

  pre {
    padding: 1.5rem 1rem;
    border-radius: 4px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.preColor};
    overflow-x: auto;
  }

  code {
    font-family: "Fira Mono", monospace;
    font-size: 1.4rem;

    * {
      font-family: inherit;
    }
  }

  code [class*="language-"] {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.1px;
    tab-size: 4;
    word-spacing: 0px;
    background: none;
  }

  p > code,
  ol code,
  li code {
    background-color: ${({ theme }) => theme.codeColor};
    padding: 0.1rem 0.6rem;
    border-radius: 2px;
    font-size: 1.5rem;
    margin: 0 0.1rem;
  }

  blockquote {
    background-color: ${({ theme }) => theme.preColor};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 1rem 2rem;
  }
  blockquote {
    border-left: none;
    border-bottom: 3px solid ${({ theme }) => theme.pointColor};
    border-right: 3px solid ${({ theme }) => theme.pointColor};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
  table {
    border: 1px solid ${({ theme }) => theme.tableColor};
    background-color: ${({ theme }) => theme.bgElement};
  }

  th {
    padding: 0.5rem 3rem;
    border-bottom: 3px solid white;
  }

  td {
    padding: 0.8rem;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    border: 1px solid ${({ theme }) => theme.pointColor};
  }

  a {
    color: ${({ theme }) => theme.pointColor};
  }
`;

export { MarkdownCss };
