import React from "react";

import styled from "styled-components";
import { ColorButton } from "../../Button";
import { useDispatch } from "react-redux";
import { loginActions } from "../../../redux/loginState";

const Button = styled(ColorButton)`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.4rem")};
`;

export default function LogOutButton({ fontSize }) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(loginActions.setLogout());
  };

  function fetchLogout() {
    fetch("/logout").then(() => {
      logout(false);
    });
  }
  return (
    <Button fontSize={fontSize} onClick={fetchLogout}>
      로그아웃
    </Button>
  );
}
