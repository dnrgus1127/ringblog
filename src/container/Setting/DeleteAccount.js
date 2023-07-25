import React from "react";
import SettingSectionTemplate from "../../components/setting/SettingSectionTemplate";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DeleteAccountButton = styled.button`
  padding: 1rem;
  background-color: ${({ theme }) => theme.pointColor};
  width: 80%;
  margin: 0 auto;
  display: block;
`;

export default function DeleteAccount() {
  const { userId } = useSelector(state => state.login.loggedUser);
  const deleteAccount = async () => {
    const res = await fetch("/account/delete", {
      method: "POST",
    });
    if (res.status === 200) {
      window.alert("회원탈퇴 되었습니다.");
    } else {
      window.alert("오류 발생 : " + res.status);
    }
    window.location.reload();
  };
  return (
    <SettingSectionTemplate>
      <h2>계정 정보</h2>
      <h3>내 아이디</h3>
      <input type="text" disabled={true} value={userId} style={{ color: "grey" }} />
      <h3>가입 정보 <span style={{ color: "red", fontSize: "1.2rem" }}>(디자인만 구현)</span></h3>
      <h4>가입 일자</h4>
      <p>2023년 04월 12일</p>
      <h4>계정 연동</h4>
      <p>없음</p>
      <h4>개인정보 동의 기간</h4>
      <p>2025년 04월 13일 (최초 동의로부터 2년)</p>
      <h3>계정 삭제</h3>
      <DeleteAccountButton size='small' onClick={deleteAccount}>
        계정 삭제
      </DeleteAccountButton>
    </SettingSectionTemplate >
  );
}
