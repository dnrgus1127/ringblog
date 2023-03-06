import React from "react";
import { useContext } from "react";
import { Context } from "../../../functions/Login/LoginProvider";
import styled from "styled-components";
import { ColorButton } from "../../Button";

const Button = styled(ColorButton)`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.4rem")};
`;

export default function LogOutButton({ fontSize }) {
  const { setLoggedIn } = useContext(Context);
  function logout() {
    fetch("/logout").then(() => {
      setLoggedIn(false);
    });
  }
  return (
    <Button fontSize={fontSize} onClick={logout}>
      로그아웃
    </Button>
  );
}
