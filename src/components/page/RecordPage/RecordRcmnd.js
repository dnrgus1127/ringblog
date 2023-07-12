import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useRcmndList from "../../../Hooks/Rcmnd/useRcmndList";
import Error from "../../common/Error/Error";
import Loading from "../../common/Loading";
import PostCard from "../../mainPage/PostCard";

const GridLayout = styled.div`
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
    grid-auto-rows: minmax(30px, 500px);
  }
  @media (max-width: 640px) {
    grid-auto-rows: minmax(30px, 408px);
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function RecordRcmnd() {
  const { rcmndPostList, isError, rcmndListLoading } = useRcmndList();
  const { loggedIn } = useSelector((state) => state.login);

  if (!loggedIn) return <Error text={"로그인이 필요합니다."} />;
  if (rcmndListLoading) return <Loading text={"로딩중"} />;
  if (isError) return <Error text={"오류 발생"} />;

  if (rcmndPostList.length === 0)
    return <Error text={"좋아요한 글이 없습니다."} icon={"💔"} />;

  return (
    <GridLayout>
      {rcmndPostList.map((i, idx) => (
        <PostCard key={idx} idx={idx} data={i} />
      ))}
    </GridLayout>
  );
}
