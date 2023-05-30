import React from 'react'
import Header from '../Header/Header'
import styled from 'styled-components'
import media from '../../lib/style/media'

const UserBlogTemplateBlock = styled.div`
  display: flex;
  justify-content: center;
`

const UserBlogContentsBlock = styled.div`
  width: var(--width);
  background-color: ${({ theme }) => theme.bgColor};
  margin-top: calc(var(--header) *2);

  h1 {
    margin-bottom: 4rem;
  }
  img {
    width: 100%;
  }
`

const UserBlogInfomation = styled.div`
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 5rem;
    #blogIntrodution {
      display: -webkit-box;
        width: 45%;
        max-height: 10rem;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: keep-all;
        -webkit-line-clamp : 4;
        -webkit-box-orient: vertical;

    }
    #github-calender {
        width: 45%;
    }

    ${media.large} {
      flex-direction: column;
      gap : 3rem;
      #blogIntrodution {
        width: 100%;
      }
      #github-calender {
        width: 100%;
      }
    }

`

export default function UserBlogTemplate({ blogerName = "", blogIntro = "", blogerId = "", children }) {
  return (
    <UserBlogTemplateBlock>
      <Header />
      <UserBlogContentsBlock>
        <h1>{blogerName}</h1>
        <UserBlogInfomation>
          <section id='blogIntrodution'>{blogIntro}</section>
          <img id='github-calender' src={`https://ghchart.rshah.org/000000/${blogerId}`} alt="github잔디" />
        </UserBlogInfomation>
        {children}
      </UserBlogContentsBlock>
    </UserBlogTemplateBlock>
  )
}
