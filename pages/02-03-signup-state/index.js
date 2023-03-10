import { useState } from "react";
import { ErrorMassage } from "@/styles/emotion";

export default function SignupStatePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function onChangeEmail(event) {
    console.log(event); // onClick이 실행되면서 받아온 값
    console.log(event.target); // 작동된 태그
    console.log(event.target.value); // 작동된 태그에 입력된 값

    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onClickSignup() {
    // 데이터가 잘 담겼는지 확인하기
    console.log(email);
    console.log(password);

    // 검증하기
    if (email.includes("@") === false) {
      //   alert("이메일이 올바르지 않습니다");
      // document.getElementById("error").innerText = "이메일이 올바르지 않습니다"
      setEmailError("*이메일이 올바르지 않습니다");
    }

    if (password.length <= 8) {
      setPasswordError("비밀번호가 올바르지 않습니다");
    } else {
      // 메시지 알림 이전, 백엔드 컴퓨터에 있는 API(함수) 요청하기
      alert("회원가입을 축하합니다");
    }
  }

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail}></input>
      {/* <div id="error"></div> */}
      {/* onChange : input창에 값을 입력할때마다 이벤트가 발생함, 보통 on으로 시작하고 event를 발생시키는 함수를 event handler힘수라고한다 */}
      <ErrorMassage>{emailError}</ErrorMassage>
      비밀번호: <input type="password" onChange={onChangePassword}></input>
      <ErrorMassage>{passwordError}</ErrorMassage>
      <button onClick={onClickSignup}>회원가입</button>
    </>
  );
}
