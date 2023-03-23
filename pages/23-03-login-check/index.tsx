import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";

const LOGIN_USER = gql`
  mutation typesetting($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onClickLogin = async () => {
    try {
      // 1. 로그인 해서 accessToken 받아오기
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      // 2. accessToken을 global state에 저장하기  // 스코프체인 특성으로 바로 위의 accessToken을 가져옴
      if (!accessToken) {
        Modal.error({ content: "로그인에 실패했습니다. 다시 시도해주세요." });
        return;
      }
      setAccessToken(accessToken);
      // localStorage.setItem("qqq", "철수"); // qqq라는 키에 철수값이 담긴다
      localStorage.setItem("accessToken", accessToken); // 임시사용(나중에 지울 예정)

      // 3. 로그인 성공 페이지로 넘어가기
      void router.push("/23-04-login-check-success");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };
  return (
    <>
      이메일: <input onChange={onChangeEmail} type="text" />
      비밀번호: <input onChange={onChangePassword} type="password" />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
