import React from "react";
import styled from "styled-components";
import { Fetch } from "../Fetch";
import PostCard from "./PostCard";

const Container = styled.div`
  width: calc(var(--width) * 0.6);
  margin: 0 auto;

  @media (max-width: 640px) {
    width: var(--width);
  }
`;

export default function AllPostsOfUser({ writer }) {
  return (
    <Container>
      <Fetch uri={`/posts/writer?writer=${writer}`} renderSuccess={Contents} />
    </Container>
  );
}

function Contents({ data }) {
  console.log(data);
  return (
    <div>
      {data.map((item, idx) => (
        <PostCard key={idx} item={item} />
      ))}
    </div>
  );
}
