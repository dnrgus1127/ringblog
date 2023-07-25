import React from "react";
import styled from "styled-components";
import media from "../../lib/style/media";

const Section = styled.div`
  width: 100%;
  height: 100%;

  h2 {
    margin-bottom: 2rem;
  }
  h3,h4 {
    margin-bottom: 1rem;
  }

  h4 {
    margin-top: 2rem;
  }

  p {
    color: ${({ theme }) => theme.greyColor};
    font-size: 1.2rem;
  }

  input,
  p {
    margin-bottom: 1rem;
  }
  input,
  textarea {
    background-color: ${({ theme }) => theme.bgElement3};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: 0 1rem;
  }
  input {
    width: 100%;
    /* height: 2.5rem; */
    font-size : 1.6rem;
    padding: .1rem 1rem;
  }

  textarea {
    width: 80%;
    height: 20%;
    overflow-y: auto;
    padding: 0.5rem 1rem;
  }

  .btnWrap {
    margin-top: 6rem;
  }

  .errorMsg {
    color: ${({ theme }) => theme.warning};
  }

  ${media.small} {
    input,
    textarea,
    .introHeadAndLength {
      width: 100%;
    }
  }
`;
export default function SettingSectionTemplate({ children }) {
  return <Section>{children}</Section>;
}
