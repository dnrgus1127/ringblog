import React, { useState } from "react";
import { useQuery } from "react-query";
import { useQuery as urlQuery } from '../../functions/urlQuery';
import styled from "styled-components";
import Error from "../common/Error/Error";
import Loading from "../Loading";
import SearchBox from "./SearchBox";
import PostCard from "../mainPage/PostCard";
import GridLayout from "../common/Layout/GridLayOut";
import media from "../../lib/style/media";
const UserBlogPostCardListBlock = styled.div`
  width: calc(var(--width) * 0.6);

  ${media.large} {
    width: calc(var(--width) * 0.8);
  }

  ${media.medium} {
    width: 100%;
  }

  ${media.small} {
    width: var(--width);
  }
`;

export default function PostCardList({ uri }) {
  const [searchTerm, setSearchTerm] = useState("");

  let query = urlQuery();
  const writer = query.get("writer");

  const defaultQuery = `${uri}?writer=${writer}`;
  const searchQuery = defaultQuery + `&search=${searchTerm}`;

  const { data, isLoading, isError } = useQuery(
    ["posts", uri, searchTerm],
    async () => {
      // const response = await fetch(
      //   `${uri}?writer=${writer}${searchTerm !== "" ? `&search=${searchTerm}` : ``
      //   }`
      // );
      const response = await fetch(`${searchTerm === "" ? defaultQuery : searchQuery}`)

      return response.json();
    }
  );
  if (isLoading) return <Loading />;
  if (isError) return <Error text='데이터 로딩 에러' />;

  if (data.length === 0) return <div>
    {/* ? SearchBox 안넣어주면 검색 결과 없을때 재검색 불가능 */}
    <SearchBox onBlur={setSearchTerm} />
    <Error text="게시글이 없습니다." />
  </div>
  return (
    <UserBlogPostCardListBlock>
      {/* // ! SearchBox CSS 위치 수정 필요 */}
      <SearchBox onBlur={setSearchTerm} />
      <GridLayout>
        {data.map((item, idx) => (
          <PostCard data={item} key={idx} />
        ))}
      </GridLayout>
    </UserBlogPostCardListBlock>
  );
}

