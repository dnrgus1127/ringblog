import React from "react";
import styled, { css } from "styled-components";

const MarginCSS = styled.div`
  ${(props) =>
    props.size === "xlarge" &&
    css`
      margin: 3rem 0;
    `};
  ${(props) =>
    props.size === "large" &&
    css`
      margin: 2.5rem 0;
    `};
  ${(props) =>
    props.size === "medium" &&
    css`
      margin: 2rem 0;
    `};
  ${(props) =>
    props.size === "small" &&
    css`
      margin: 1.5rem 0;
    `};
  ${(props) =>
    props.size === "xsmall" &&
    css`
      margin: 1rem 0;
    `};
  ${(props) =>
    props.size === "custom" &&
    css`
      margin: ${props.value} 0;
    `};
`;
export default function Margin({ children, size = "medium", value = "0" }) {
  return (
    <MarginCSS size={size} value={value}>
      {children}
    </MarginCSS>
  );
}
