import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 40vh;
  background-color: ${(props) => props.bgColor};
  width: 100%;
  transform: translateY(-100%);
  transition: 0.3s all ease-out;
`;

export default function HideMenu({ dark, trigger }) {
  return (
    <Container
      bgColor={dark ? "var(--bg-menu)" : "white"}
      style={
        trigger
          ? { transform: "translateY(0%)" }
          : { transform: "translateY(-100%)" }
      }
    ></Container>
  );
}
