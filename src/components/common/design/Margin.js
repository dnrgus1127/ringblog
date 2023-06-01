import React from "react";
import styled from "styled-components";

const MarginCSS = styled.div`
  margin: 2rem 0;
`;
export default function Margin({ children }) {
  return <MarginCSS>{children}</MarginCSS>;
}
