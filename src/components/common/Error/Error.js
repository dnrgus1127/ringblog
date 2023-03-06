import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  font-size: 4.5rem;
  font-weight: 800;
  padding: 10rem 0;
  @media (max-width: 832px) {
    font-size: 4rem;
  }

  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

export default function Error({ text, icon }) {
  return (
    <Container>
      <p className='logo'>
        {" "}
        {icon ? icon : "📢"} {text}
      </p>
    </Container>
  );
}
