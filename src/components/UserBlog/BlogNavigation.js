import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;
const Navigation = styled.div`
  width: calc(var(--width) * 0.6);
  display: flex;
  @media (min-width: 1400px) {
  }
  @media (max-width: 1100px) {
    width: calc(var(--width) * 0.8);
  }
  @media (max-width: 832px) {
    width: calc(var(--width));
  }
  .selected {
    border-bottom: 2px solid ${({ theme }) => theme.btnColor};
  }
`;
const NavItem = styled.div`
  width: ${(props) => `${props.width}%`};
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  cursor: pointer;
`;

const Contents = ["최근 글", "인기 글", "시리즈"];

export default function BlogNavigation({ navType, setNavType }) {
  return (
    <Container>
      <Navigation>
        {Contents.map((item, idx) => (
          <NavItem
            className={navType === idx ? "selected" : null}
            key={idx}
            width={100 / Contents.length}
            onClick={() => {
              setNavType(idx);
            }}
          >
            <p>{item}</p>
          </NavItem>
        ))}
      </Navigation>
    </Container>
  );
}
