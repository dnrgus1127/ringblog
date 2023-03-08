import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Item = styled.div`
  padding: 1rem 1.5rem;
  text-align: start;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.greyColor};
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;
`;

export default function NewPostSeries({ data }) {
  const [seriesIndex, setIndex] = useState();
  return (
    <Container>
      {seriesIndex}
      {data.map((item, idx) => (
        <Item
          key={idx}
          onClick={() => {
            setIndex(idx);
          }}
        >
          {item.title}
        </Item>
      ))}
    </Container>
  );
}
