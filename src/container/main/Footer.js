import React from "react";
import styled from "styled-components";

const FooterBlock = styled.div`
  padding : 2rem 4rem;
  
  margin-top: 4rem;
  border-top: 2px solid ${({ theme }) => theme.pointColor};
  * {
    color :${({ theme }) => theme.pointColor};
  }
  display: flex;
  
`;

const Section = styled.div`

  &:nth-child(1) {
    flex-grow: 1;
  }
  &:nth-child(2) {
    flex-grow: 2;
  }
  &:nth-child(3) {
    flex-grow: 2;
  }

  h1,h2,h3 {
    color : ${({ theme }) => theme.color}
  }
  li{
    list-style: none;

  }
  
`

export default function Footer() {
  return <FooterBlock>
    <Section>
      <h1>정욱현</h1>
      <p>25세 웹 프로그래머 지망</p>
    </Section>
    <Section >
      <h2>프로젝트</h2>
      <ul>
        <li>포트폴리오</li>
        <li>RingBlog</li>
        <li>타입스크립트</li>
        <li>MBTI</li>
      </ul>
    </Section>
    <Section >
      <h2>소셜</h2>
      <ul>
        <li>블로그</li>
        <li>GitHub</li>
        <li>Velog</li>
        <li>about</li>
      </ul>
    </Section>

  </FooterBlock>;
}
