import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 800;
  padding: 1rem 2rem;
  border-radius: 4px;
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
  &:disabled {
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
  background-color: ${({ theme }) => theme.btnColor};
  color: ${({ theme }) => theme.oppositeColor};
`;

export const ConfirmButton = ({ onClick, children, size = "medium" }) => {
  return (
    <Confirm onClick={onClick} size={size}>
      {children}
    </Confirm>
  );
};

// 설정메뉴에서 사용하는 버튼
const Setting = styled(Button)`
  background-color: ${({ theme }) => theme.btnColor2};
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
