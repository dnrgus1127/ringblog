import React from "react";
import styled from "styled-components";

const PostItem = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  padding: 2rem;
`;

export default function SubPostItem({ data }) {
  return <PostItem>{data.title}</PostItem>;
}
