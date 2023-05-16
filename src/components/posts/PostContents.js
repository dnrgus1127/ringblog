import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MarkdownCss } from "../common/markdown/MarkdownCss";
import { onlyDate } from "../../functions/dateFormat";
import CustomMD from "../common/markdown/CustomMD";
import MarkdownNav from "../common/markdown/MarkdownNav";
import PostEditBtn from "./PostEditBtn";
import { Link } from "react-router-dom";
import CommentBox from "./comments/CommentBox";
import SideMenu from "./SideMenu";
import SubscriptionButton from "./Subscription/SubscriptionButton";
import SeriesInPosts from "./SeriesInPosts";
import PostThumbnail from "./PostThumbnail";
import { useSelector } from "react-redux";
import useQueryUri from "../../Hooks/useQueryUri";
import HashTagBlock from "../hasTags/HashTagBlock";

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
  @media screen and (max-width: 640px) {
    width: var(--width);
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

export default function PostContents({ post, index }) {
  const createDate = onlyDate(post.createDateTime);
  const markdownRef = useRef({});
  const [fixed, setfixed] = useState(false);
  const { loggedUser } = useSelector((state) => state.login);
  const { hashTags } = useSelector((state) => state.post);
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
      {/* onClick navgation 추가 */}
      <HashTagBlock hashTags={hashTags} onClick={() => {}} />

      <div className='subscriptionWrap'>
        <SubscriptionButton writer={post.writer} />
      </div>
      <CommentBox index={index} />
    </Container>
  );
}
