// ! 폐기
import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../functions/Login/LoginProvider";
import CustomCheckBox from "../common/CustomCheckBox";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement2};
  border-radius: 4px;
  padding: 2rem 3rem;
  min-width: 25vw;

  h4 {
    margin-bottom: 2rem;
  }
`;

export default function ChoosePosts({
  includeList,
  addNumbers,
  delNumbers,
  postList,
}) {
  const { loggedIn } = useContext(Context);

  if (!loggedIn) return;
  return (
    <Container>
      <h4>시리즈에 글 추가</h4>
      <CustomCheckBox
        data={postList && postList}
        check={addNumbers}
        unCheck={delNumbers}
        includeList={includeList}
      />
    </Container>
  );
}
