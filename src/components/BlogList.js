import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlogItem from "./BlogItem";

const GridLayout = styled.div`
  width: var(--width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(30px, 414px);
  grid-gap: 3.2rem;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(30px, 390px);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(30px, 460px);
  }
  @media (max-width: 832px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(30px, 768px);
  }
  @media (max-width: 640px) {
    grid-auto-rows: minmax(30px, 408px);
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function BlogList() {
  //   const itemList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [data, setData] = useState([1]);

  useEffect(() => {
    fetch("/posts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <GridLayout>
      {/* {itemList.map((i, idx) => (
        <BlogItem key={idx} idx={idx} />
      ))} */}
      {data.map((i, idx) => (
        <BlogItem key={idx + 12} idx={idx} data={i} />
      ))}
    </GridLayout>
  );
}
