import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 800;
  padding: 1rem 2rem;
  border-radius: 4px;
  transition: all 0.2s ease-in;
  ${(props) =>
    props.size === "xsmall" &&
    css`
      font-size: 1.2rem;
      padding: 0.4rem 0.8rem;
      border-radius: 2px;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.4rem;
      padding: 0.6rem 1.2rem;
      border-radius: 2px;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 1.6rem;
      padding: 0.8rem 1.6rem;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 1.8rem;
      padding: 1rem 2rem;
    `}
  &:disabled, &:disabled:hover {
    background-color: ${({ theme }) => theme.greyColor};
  }
`;

// 일반 버튼
export const CancelButton = ({ onClick, children, size = "medium" }) => {
  return (
    <Button onClick={onClick} size={size}>
      {children}
    </Button>
  );
};

//  확인 버튼
const Confirm = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  color: ${({ theme }) => theme.oppositeColor};

  :hover {
    background-color: ${({ theme }) => theme.btnHover};
  }
`;

export const ConfirmButton = ({
  onClick,
  children,
  size = "medium",
  type,
  className,
  disabled,
}) => {
  return (
    <Confirm
      onClick={onClick}
      size={size}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
    </Confirm>
  );
};

// 설정메뉴에서 사용하는 버튼
const Setting = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  color: ${({ theme }) => theme.Color};
  border-radius: 6px;
`;
export const SettingButton = ({
  onClick,
  children,
  size = "medium",
  disabled,
}) => {
  return (
    <Setting onClick={onClick} size={size} disabled={disabled}>
      {children}
    </Setting>
  );
};

// isChange 값에 따라서 색상이 변하는 버튼
const ColorChanging = styled(Confirm)`
  ${(props) => props.isChange && { backgroundColor: `${props.bgColor}` }}
`;
export const ColorChangingButton = ({
  onClick,
  children,
  size = "medium",
  isChange = false,
  bgColor = "grey",
}) => {
  return (
    <ColorChanging
      onClick={onClick}
      size={size}
      bgColor={bgColor}
      isChange={isChange}
    >
      {children}
    </ColorChanging>
  );
};

const Close = styled(Confirm)`
  padding: 1rem;

  svg {
    display: block;
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
  }
`;

export const CloseButton = ({ onClick }) => {
  return (
    <Close onClick={onClick}>
      <svg
        clipRule='evenodd'
        fillRule='evenodd'
        strokeLinejoin='round'
        strokeMiterlimit='2'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z' />
      </svg>
    </Close>
  );
};
