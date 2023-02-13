import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MarkdownCss } from "../markdown/MarkdownCss";
import { onlyDate } from "../../functions/dateFormat";
import CustomMD from "../markdown/CustomMD";
import MarkdownNav from "../markdown/MarkdownNav";
import PostEditBtn from "./PostEditBtn";
import { useContext } from "react";
import { Context } from "../../functions/Login/LoginProvider";
import { Link } from "react-router-dom";
import CommentBox from "./comments/CommentBox";

const Container = styled.div`
  position: relative;

  .writerAndWriteDate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12rem;
  }
  .mdNav {
    position: absolute;
    left: 105%;
  }
  .mdNavPosition {
    position: absolute;
    top: 14rem;
    /* right: calc(var(--width) * -0.25); */
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
`;

const CreateDate = styled(Text)`
  color: ${({ theme }) => theme.greyColor};
`;

export default function PostContents({ post, index }) {
  const createDate = onlyDate(post.createDateTime);
  const markdownRef = useRef({});
  const [mdList, setMdList] = useState([]);
  const [nodeList, setNodeList] = useState([]);
  const [fixed, setfixed] = useState(false);
  const { loggedUser } = useContext(Context);

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

  //? 헤딩 태그 네비게이션 에 들어갈 헤더 리스트 구하는 Hook
  useEffect(() => {
    let arr = [];
    let nodes = [];
    let list = markdownRef.current.children;
    if (list[0]) {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].localName === "h1" ||
          list[i].localName === "h2" ||
          list[i].localName === "h3"
        ) {
          arr.push({
            text: list[i].innerText,
            tag: list[i].localName,
          });
          nodes.push(list[i]);
        }
      }
      setNodeList([...nodes]);
      setMdList([...arr]);
    }
  }, [post]);

  return (
    <Container>
      <Title as={"h1"}>{post.title}</Title>

      {loggedUser.username === post.name ? (
        <PostEditBtn index={post._id} />
      ) : null}

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
            <MarkdownNav list={mdList} nodes={nodeList} />
          </div>
        </div>
      </div>

      <MarkdownCss ref={markdownRef}>
        <CustomMD>{post.contents}</CustomMD>
      </MarkdownCss>

      <hr></hr>
      <CommentBox index={index} />
    </Container>
  );
}