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
`;

const Confirm = styled(Button)`
  background-color: ${({ theme }) => theme.btnColor};
  color: ${({ theme }) => theme.oppositeColor};
`;

const Setting = styled(Button)`
  background-color: ${({ theme }) => theme.btnColor2};
  color: ${({ theme }) => theme.Color};
  border-radius: 6px;
`;

export const CancelButton = ({ onClick, children, size = "medium" }) => {
  return (
    <Button onClick={onClick} size={size}>
      {children}
    </Button>
  );
};

export const ConfirmButton = ({ onClick, children, size = "medium" }) => {
  return (
    <Confirm onClick={onClick} size={size}>
      {children}
    </Confirm>
  );
};

export const SettingButton = ({ onClick, children, size = "medium" }) => {
  return (
    <Setting onClick={onClick} size={size}>
      {children}
    </Setting>
  );
};
