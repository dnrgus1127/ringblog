import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import DarkModeBtn from "../common/button/DarkModeBtn";
import NewPostBtn from "../WritePosts/NewPostBtn";

const MenuSection = styled.div`
  display: flex;
  align-items: center;

  & > div {
    height: 40px;
    padding: 8px;
    border-radius: 100%;
    z-index: 9999;
  }
  .menuHover:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: 0.5s all ease-out;
    transform: scale(1.1);
    margin: 0 10px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  svg {
    display: block;
    fill: ${({ theme }) => theme.color};
    width: 2.4rem;
    height: 2.4rem;
  }

  .menuIcon {
    cursor: pointer;
  }
  .menuIcon:hover {
    margin-left: 10px;
    transform: scale(1.3);
    transition: 0.5s all ease-out;
  }
  @media (max-width: 640px) {
    .menuHover:hover {
      transform: none;
      margin: 0;
    }
  }
`;

export default function Gnb({ setHideMenu, hideMenu }) {
  const { loggedIn } = useSelector((state) => state.login);

  return (
    <MenuSection>
      <DarkModeBtn />

      {loggedIn === true ? <NewPostBtn /> : null}

      <div
        className='menuIcon'
        onClick={() => {
          setHideMenu(!hideMenu);
        }}
      >
        <svg
          width='100%'
          height='100%'
          clipRule='evenodd'
          fillRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z'
            fillRule='nonzero'
          />
        </svg>
      </div>
    </MenuSection>
  );
}
