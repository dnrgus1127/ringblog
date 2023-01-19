import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 80vh;
  background-color: ${({ theme }) => theme.bgElement};
  width: 100%;
  transform: translateY(-100%);
  transition: 0.3s all ease-out;
  padding: 0 var(--gap);
  padding-top: calc(var(--header) * 0.75);
  z-index: 9998;
`;
const SiteMap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 var(--gap);
`;

export default function HideMenu({ trigger }) {
  return (
    <Container
      style={
        trigger
          ? { transform: "translateY(0%)" }
          : { transform: "translateY(-100%)" }
      }
    >
      <SiteMap></SiteMap>
    </Container>
  );
}
