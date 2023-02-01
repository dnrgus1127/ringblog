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
    background-color: rgba(0, 0, 0, 1);
    border-radius: 4px;
  }
  code {
    font-size: 1.4rem;
    font-family: "Fira Mono", monospace;
    font-weight: 400;
    line-height: 2.1px;
    tab-size: 4;
    word-spacing: 0px;
  }

  blockquote {
    background-color: ${({ theme }) => theme.bgElement};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 1rem 2rem;
    border-left: 4px solid #63e6be;
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
    width: 100%;
  }
`;

export { MarkdownCss };
