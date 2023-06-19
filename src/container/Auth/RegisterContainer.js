import React, { useState } from "react";
import {
  checkId,
  checkName,
  checkPassword,
} from "../../functions/Login/AccountValidation";
import RegisterFrom from "../../components/common/Auth/Register/RegisterFrom";
import { useMutation } from "react-query";
import Loading from "../../components/Loading";
import RegisterComplete from "../../components/common/Auth/Register/RegisterComplete";

export default function RegisterContainer() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [isCheckId, setIsCheckId] = useState({
    // 중복, 유효성 검사, 빈칸 시 isCheck true
    isCheck: false,
    message: "",
  });
  const [isCheckName, setIsCheckName] = useState({
    isCheck: false,
    message: "",
  });
  const [CheckedPw, setCheckedPw] = useState({
    isCheck: false,
    message: "",
  });

  const validInput = (e) => {
    switch (e.target.name) {
      case `id`:
        checkId(e.target.value, setIsCheckId);
        setId(e.target.value);
        break;
      case "password":
        checkPassword(e.target.value, setCheckedPw);
        setPassword(e.target.value);
        break;
      case "username":
        checkName(e.target.value, setIsCheckName);
        setName(e.target.value);
        break;
      default:
        break;
    }
  };

  // ! 에러 처리 미흡
  const { mutate: createAccount, isLoading } = useMutation(
    ["registerId", id],
    async () => {
      const res = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({
          userId: id,
          password: password,
          name: name,
        }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json();
    },
    {
      onSuccess: () => {
        setRegisterSuccess(true);
      },
    }
  );
  if (isLoading) return <Loading text='회원가입중' />;
  if (registerSuccess) return <RegisterComplete />;
  return (
    <RegisterFrom
      id={id}
      password={password}
      name={name}
      createAccount={createAccount}
      isCheckId={isCheckId}
      isCheckName={isCheckName}
      isCheckPw={CheckedPw}
      valid={validInput}
      disableCreateAccount={
        isCheckId.isCheck || isCheckName.isCheck || CheckedPw.isCheck
      }
    />
  );
}
