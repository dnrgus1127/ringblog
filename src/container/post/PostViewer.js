import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MarkdownCss } from "../../components/common/markdown/MarkdownCss";
import { onlyDate } from "../../functions/dateFormat";
import CustomMD from "../../components/common/markdown/CustomMD";
import MarkdownNav from "../../components/common/markdown/MarkdownNav";
import PostEditBtn from "../../components/posts/PostEditBtn";
import { Link } from "react-router-dom";
import PostComments from "./PostComments.js";
import SideMenu from "../../components/posts/SideMenu";
import PostThumbnail from "../../components/posts/PostThumbnail";
import { useSelector } from "react-redux";
import useQueryUri from "../../Hooks/useQueryUri";
import HashTagBlock from "../../components/hasTags/HashTagBlock";
import SeriesInPosts from "../../components/posts/SeriesInPosts";
import { ColorChangingButton } from "../../components/common/button/Button";
import useSubscription from "../../Hooks/Subscribe/useSubscription";
import MobileScrollTopButton from "../../components/mobile/MobileScrollTopButton";

const Container = styled.div`
  position: relative;

  .writerAndWriteDate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4rem;
  }
  .mdNav {
    position: absolute;
    left: 105%;
  }
  .sideMenu {
    position: absolute;
    left: -10rem;
  }
  .sideWrap {
    position: absolute;
    top: 14rem;
  }
  .mdNavPosition {
    position: absolute;
    top: 14rem;
  }

  .subscriptionWrap {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  hr {
    margin: 5rem 0;
    border: none;
    height: 1px;
    background-color: ${({ theme }) => theme.greyColor};
  }

  @media screen and (max-width: 1100px) {
    .mdNavPosition {
      visibility: hidden;
      display: none;
    }
  }
`;

const Text = styled.p``;

const Title = styled(Text)`
  font-size: 3em;
  margin-bottom: 8rem;
`;
const Writer = styled(Text)`
  font-size: 1.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.btnColor};
`;

const CreateDate = styled(Text)`
  color: ${({ theme }) => theme.greyColor};
`;

export default function PostViewer({ post, index }) {
  const createDate = onlyDate(post.createDateTime);
  const markdownRef = useRef({});
  const [fixed, setfixed] = useState(false);
  const { loggedUser } = useSelector((state) => state.login);
  const { hashTags } = useSelector((state) => state.post);
  const { sub, subscribe, unSubscribe } = useSubscription(post.writer);
  const { loggedIn } = useSelector((state) => state.login);
  const underRef = useRef();

  /**
   * ? 스크롤 위치에 따라서 Markdown Navigation 포지션 고정
   */
  const fixedNav = useCallback(() => {
    if (140 >= markdownRef.current.getBoundingClientRect().top) {
      setfixed(true);
    } else {
      setfixed(false);
    }
  }, []);

  // ? 윈도우 스크롤 이벤트 추가
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", fixedNav);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", fixedNav);
    };
  }, [fixedNav]);

  const { data: seriesByPosts, isLoading } = useQueryUri(
    ["seriesForPost", index],
    `/series/ForPost?postId=${index}`,
    100000
  );

  return (
    <Container>
      <Title as={"h1"}>{post.title}</Title>

      <PostEditBtn index={post._id} auth={loggedUser.username === post.name} />

      <div className='writerAndWriteDate'>
        <Link to={`/UserBlog?writer=${post.writer}`}>
          <Writer>{post.name}</Writer>
        </Link>
        <CreateDate>{createDate}</CreateDate>
        <div className='mdNav'>
          <div
            className='mdNavPosition'
            style={
              fixed
                ? {
                    position: "fixed",
                  }
                : null
            }
          >
            <MarkdownNav mdRef={markdownRef} />
          </div>
        </div>
        <div className='sideMenu'>
          <div
            className='sideWrap'
            style={
              fixed
                ? {
                    position: "fixed",
                  }
                : null
            }
          >
            <SideMenu
              index={index}
              scroll={() => {
                underRef.current.scrollIntoView({
                  behavior: "auto",
                  block: "center",
                  inline: "start",
                });
              }}
            />
          </div>
        </div>
      </div>
      {isLoading ? <div>로딩쓰</div> : <SeriesInPosts data={seriesByPosts} />}
      <PostThumbnail src={post.thumbnailPath} className='margin-bottom-2' />

      <MarkdownCss ref={markdownRef}>
        <CustomMD>{post.contents}</CustomMD>
      </MarkdownCss>

      <hr ref={underRef}></hr>
      {/* // todo onClick navgation 추가 */}
      <HashTagBlock hashTags={hashTags} onClick={() => {}} />

      {loggedIn && (
        <div className='subscriptionWrap'>
          <ColorChangingButton
            isChange={sub}
            onClick={() => {
              sub ? unSubscribe() : subscribe();
            }}
          >
            {sub ? "구독 그만할래요 " : "이 글쓴이 구독하기"}
          </ColorChangingButton>
        </div>
      )}
      <PostComments index={index} />
      <MobileScrollTopButton />
    </Container>
  );
}
