import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement};
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.p`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${({ theme }) => theme.btnColor};
`;

export default function SubUserInfo({ userId }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`/userinfo?userId=${userId}`)
      .then((res) => res.json())
      .then(setData);
  }, [userId]);

  return (
    <Link to={`/userBlog?writer=${userId}`}>
      <Container>
        <UserName>{data.name}</UserName>
      </Container>
    </Link>
  );
}
