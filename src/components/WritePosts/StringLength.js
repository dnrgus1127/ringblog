import React from "react";

import styled from "styled-components";

const Container = styled.div`
  text-align: right;
  padding-top: 1rem;
  padding-right: 2rem;
  font-size: 1rem;
`;

/**
 * props로 문자열 받아서 문자열의 길이를 표시하는 컴포넌트
 * @props data
 * @param {*}
 * @returns
 */
export default function StringLength({ string }) {
  const maxLength = 5000;

  return (
    <Container>
      <span
        style={string.length > maxLength ? { color: "red" } : { color: "grey" }}
      >
        {string.length}
      </span>{" "}
      / {maxLength}
    </Container>
  );
}
