import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  .selected {
    border-bottom: 2px solid ${({ theme }) => theme.btnColor};
  }
`;
const MenuItem = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: ${(props) => `${100 / props.count}%`};
  height: 100%;
  font-size: 1.6rem;
  font-weight: 800;
  @media (min-width: 1400px) {
  }
  @media (max-width: 1100px) {
  }
  @media (max-width: 832px) {
  }
  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

export default function XNavgation({ items, index, setIndex }) {
  return (
    <Menu>
      {items.map((item, idx) => (
        <MenuItem
          key={idx}
          count={items.length}
          className={idx === index ? "selected" : null}
          onClick={() => {
            setIndex(idx);
          }}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}
