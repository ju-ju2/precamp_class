import { useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// 다이나믹 임포트
import dynamic from "next/dynamic";
// import { Modal } from "antd";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage() {
  const [value, setValue] = useState();
  // const qqq = (값)=>{
  //     setValue(값)
  // }

  // ReactQuill 만든 사람들이 만든 onChange 이므로 event가 아니라 value가 들어온다
  const onChangeContents = (value: string) => {
    console.log(value);
  };

  const onClickSubmit = async () => {
    // code-splitting 코드 스플릿팅 방식 // 다운로드 나눠서 하기
    // 전체 기능 중에서 하나만 작동될때, import가 많아지면 렌더링이 늦어질수 밖에 없기 때문에 동작할지도 모르는 기능은 작동할때만 임포트
    const { Modal } = await import("antd");
    Modal.success({ content: "등록에 성공하였습니다" });
  };
  return (
    <>
      <div>
        작성자: <input type="text" />
        <br />
        비밀번호: <input type="password" />
        <br />
        제목: <input type="text" />
        <br />
        {/* 내용: <ReactQuill onChange={(값)=>setValue(값)}/> */}
        {/* reactQuill 만든사람이 만든 onChange라 이벤트가 들어오는게 아니다. 들어온거 그대로 값을 저장하기 때문에 앞의 (값) => 부분 생략 가능 */}
        {/* 내용: <ReactQuill onChange={setValue(aaa)}/>  */}
        내용: <ReactQuill onChange={onChangeContents} />
        <br />
        <button onClick={onClickSubmit}>등록하기</button>
      </div>
    </>
  );
}

// Problem : server에서 html을 그려볼때 document를 찾지 못해 에러가난다
// try : 내용: < process.browser && ReactQuill onChange={onChangeContents} />
// problem: 여전히 에러가 난다 -> server에서 import자체가 안되는 라이브러리가 있다.
// try : 브라우저에서만 임포트 하자! -> 동적 임포트, 다이나믹 임포트!!

// 문제가 생기는 이유: 리액트와는 달리 넥스트는 서버에서 프리랜더링을 거치기때문에!

// react에서 사용하는 다이나믹 라우팅 : 클릭을 해야 실햄됨
// const { Modal } = await import("antd"); 이렇게 사용

// next에서 사용하는 다이나믹 라우팅: 페이지 접속하자마자 실행되야 하기 때문에
// 서버 임포트 되는것을 막기위해 dynamic을 쓴다.
