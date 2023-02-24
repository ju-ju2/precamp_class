import BoardWriteUI from "./boardWrite.presenter";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_BOARD } from "./BoardWrite.queries";

export default function BoardWrite() {
  //자바스크립트 영역
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [myWidth, setMyWidth] = useState(false);

  const [나의함수] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        //variables가 $역할을 해주기때문에 한번 더 쓸 필요 없다
        writer: writer, //$writer 랑 state 변수 writer랑 같아도 상관없다, 아예 다른 놈임
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    alert(result.data.createBoard.message);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (writer && title && contents) {
      setMyWidth(true);
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (writer && title && contents) {
      setMyWidth(true);
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
    if (writer && title && contents) {
      setMyWidth(true);
    }
  };

  //html영역(return아래)
  return (
    <>
      <div>2.부모-자식 메세지</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        myWidth={myWidth}
      />
    </>
  );
}
