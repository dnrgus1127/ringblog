import React from "react";
import { useEffect } from "react";

import styled, { css } from "styled-components";

const Container = styled.div`
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 1.4rem;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 1.6rem;
    `}
`;

/**
 * props로 문자열 받아서 문자열의 길이를 표시하는 컴포넌트
 * @props data
 * @param {*}
 * @returns
 */
export default function StringLength({
  string,
  maxLength = 5000,
  overLimit,
  size = "medium",
  className,
}) {
  useEffect(() => {
    if (string.length > maxLength) {
      overLimit(true);
    } else {
      overLimit(false);
    }
  }, [string, overLimit, maxLength]);
  return (
    <Container size={size} className={className}>
      <span
        style={string.length > maxLength ? { color: "red" } : { color: "grey" }}
      >
        {string.length}
      </span>{" "}
      / {maxLength}
    </Container>
  );
}
