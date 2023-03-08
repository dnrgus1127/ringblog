import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Fetch } from "../Fetch";
import PostCard from "./PostCard";
import SearchBox from "./SearchBox";

const Container = styled.div`
  width: calc(var(--width) * 0.6);
  margin: 0 auto;

  @media (max-width: 1100px) {
    width: calc(var(--width) * 0.8);
  }

  @media (max-width: 832px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    width: var(--width);
  }
`;
const NoPost = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
`;

export default function AllPostsOfUser({ writer }) {
  const [uri, setUri] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setUri(`/posts/writer?writer=${writer}`);
    } else {
      setUri(`/posts/writer?writer=${writer}&search=${searchTerm}`);
    }
  }, [writer, searchTerm]);
  return (
    <Container>
      <SearchBox onBlur={setSearchTerm} />

      <Fetch uri={uri} renderSuccess={Contents} />
    </Container>
  );
}

function Contents({ data }) {
  if (data.length !== 0) {
    return (
      <div>
        {data.map((item, idx) => (
          <PostCard key={idx} item={item} />
        ))}
      </div>
    );
  } else {
    return <NoPost>게시글이 없습니다.</NoPost>;
  }
}
