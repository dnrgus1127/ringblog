import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "../../lib/style/media";
import { ConfirmButton, Button, CloseButton } from "../common/button/Button";
import { writeActions } from "../../store/writeReducer";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement2};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  height: 8vh;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btnWrap {
    display: flex;
  }
`;

const Btn = styled.button`
  font-size: 2rem;
  font-weight: 800;
  font-family: "Noto Sans KR", sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(64, 64, 64, 0.7);
  }

  ${media.medium} {
    font-size: 1.4rem;
  }

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

const BtnBack = styled(Btn)`
  padding: 0.5rem 2rem;
  border-radius: 4px;
`;

const PreviewButton = styled(Button)`
  display: none;
  color: ${({ theme }) => theme.btnColor};
  ${media.medium} {
    display: block;
  }
`;
const CloseButtonWrap = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  margin: 1rem;
  z-index: 3;
  ${media.medium} {
    display: block;
  }
`;

export default function PostEditorUnderMenu({ onClick, textOver }) {
  const { postNumber, data, onMobilePreview } = useSelector(
    (state) => state.write
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container>
      <BtnBack
        onClick={() => {
          navigate(-1);
        }}
      >
        나가기
      </BtnBack>

      <div className='btnWrap'>
        <PreviewButton
          onClick={() => {
            dispatch(writeActions.onToggleMobliePreivew());
          }}
          bg={false}
        >
          미리보기
        </PreviewButton>
        <ConfirmButton
          onClick={onClick}
          disabled={!(data.title.length >= 2 && !textOver)}
        >
          {postNumber ? "수정하기" : "제출하기"}
        </ConfirmButton>
      </div>
      <CloseButtonWrap>
        {onMobilePreview && (
          <CloseButton
            onClick={() => {
              dispatch(writeActions.onToggleMobliePreivew());
            }}
          />
        )}
      </CloseButtonWrap>
    </Container>
  );
}
