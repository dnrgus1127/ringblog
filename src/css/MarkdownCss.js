import styled from "styled-components";

const MarkdownCss = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 3rem 0;
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
  }
  ul {
    font-size: 1.8rem;
  }
`;

export { MarkdownCss };
