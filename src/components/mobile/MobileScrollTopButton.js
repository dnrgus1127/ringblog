import React from "react";
import styled from "styled-components";

const MobileScrollTopButtonBlock = styled.div`
  @media screen and (min-width: 832px) {
    display: none;
  }
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  gap: 0.4rem;
`;

const ScrollButton = styled.button`
  background-color: ${({ theme }) => theme.bgElement3};
  border-radius: 4px;
  color: ${({ theme }) => theme.btnColor};
  font-size: 1.6rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  svg {
    width: 4rem;
    height: 4rem;
    fill: ${({ theme }) => theme.btnColor};
  }
`;

export default function MobileScrollTopButton() {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  const scrollDown = () => {
    window.scrollTo(0, 99999);
  };
  return (
    <MobileScrollTopButtonBlock>
      <ScrollButton onClick={scrollTop}>
        <svg
          clipRule='evenodd'
          fillRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z' />
        </svg>
      </ScrollButton>
      <ScrollButton onClick={scrollDown}>
        <svg
          clipRule='evenodd'
          fillRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z' />
        </svg>
      </ScrollButton>
    </MobileScrollTopButtonBlock>
  );
}
