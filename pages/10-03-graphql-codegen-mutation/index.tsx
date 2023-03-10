// args 는 arguments로 인자가 들어가는 것을 뜻한다
// 아래의 값들이 지정하는 것이 아닌 인풋창에 입역되는 값으로 들어가는 것

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../src/commons/types/generated/types";

const CREATE_BOARD = gql`
  mutation typeSetting($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState<string>("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // const [나의함수] = useMutation<RESULT타입, VARIABLES(인자)타입>(CREATE_BOARD);
  const [나의함수] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables가 $역할을 해주기때문에 한번 더 쓸 필요 없다
        writer: writer, // $writer 랑 state 변수 writer랑 같아도 상관없다, 아예 다른 놈임
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    alert(result.data?.createBoard?.message);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter}></input>
      <br />
      제목: <input type="text" onChange={onChangeTitle}></input>
      <br />
      내용: <input type="text" onChange={onChangeContents}></input>
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기)요청하기</button>
    </>
  );
}
