import React from "react";
import styled from "styled-components";

const Loading = styled.div`
  width: 100%;
  height: 14rem;
  text-align: center;
`;

export default function ComponentLoading({ text }) {
  return <Loading>{text}을 불러오는 중입니다..</Loading>;
}
