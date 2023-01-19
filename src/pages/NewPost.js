import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  .left {
    background-color: var(--bg-page2);
  }
  .right {
    background-color: var(--black3);
  }

  .writeSection {
    width: 50%;
    height: 100%;
    padding: calc(var(--gap) / 2);
  }
`;

const Input = styled.input`
  background: none;
  border: 0;
  outline: none;
  color: white;
`;

const Title = styled(Input)`
  font-size: 3rem;
`;

export default function NewPost() {
  return (
    <Container>
      <div className='left writeSection'>
        <form action='/Posts'>
          <Title type='text' placeholder='제목을 입력하세요...' />
        </form>
      </div>
      <div className='right writeSection'></div>
    </Container>
  );
}
