import React from "react";
import styled from "styled-components";

const ToolTipBox = styled.span`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  // 부모 엘리먼트인 heading의 길이만큼
  left: ${(props) => `${props.left}px`};
  background-color: ${({ theme }) => theme.color};
  min-width: 8rem;
  min-height: 5rem;
  width: auto;
  border-radius: 4px;
  padding: 0.5rem;
  z-index: 900;
  p {
    color: ${({ theme }) => theme.oppositeColor};
  }
`;

const Title = styled.p`
  font-size: medium;
  white-space: nowrap;
  margin-bottom: 0.5rem;
`;
const Description = styled.p`
  font-size: small;
  white-space: nowrap;
  padding: 0 0.5rem;
`;

export default function ToolTip({
  title = "목적",
  description = "안내글",
  top = 0,
  left = 0,
}) {
  return (
    <ToolTipBox left={left} top={top}>
      <Title>💡 {title}</Title>
      <Description>{description}</Description>
    </ToolTipBox>
  );
}
