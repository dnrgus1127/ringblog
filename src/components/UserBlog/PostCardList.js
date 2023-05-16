import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Error from "../common/Error/Error";
import Loading from "../Loading";
import SearchBox from "./SearchBox";
import PostCard from "../mainPage/PostCard";
import GridLayout from "../common/Layout/GridLayOut";
const Container = styled.div`
  width: calc(var(--width) * 0.6);

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

export default function PostCardList({ uri, writer }) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["posts", uri, searchTerm],
    async () => {
      const response = await fetch(
        `${uri}?writer=${writer}${
          searchTerm !== "" ? `&search=${searchTerm}` : ``
        }`
      );

      return response.json();
    }
  );
  if (isLoading) return <Loading />;
  if (isError) return <Error text='데이터 로딩 에러' />;
  return (
    <Container>
      <SearchBox onBlur={setSearchTerm} />
      {data && <Contents data={data} />}
    </Container>
  );
}

function Contents({ data }) {
  if (data.length !== 0) {
    return (
      <GridLayout>
        {data.map((item, idx) => (
          <PostCard data={item} key={idx} />
        ))}
      </GridLayout>
    );
  } else {
    return <NoPost>게시글이 없습니다.</NoPost>;
  }
}
