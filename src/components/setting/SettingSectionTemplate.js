import React from "react";
import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  height: 100%;

  h3 {
    margin-bottom: 1rem;
  }

  h3 {
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
    border: 1px solid ${({ theme }) => theme.greyColor};
    padding: 0 1rem;
  }
  input {
    width: 60%;
    height: 2.5rem;

    padding: 0 1rem;
  }

  textarea {
    width: 80%;
    height: 20%;
    overflow-y: auto;
  }
`;
export default function SettingSectionTemplate({ children }) {
  return <Section>{children}</Section>;
}
