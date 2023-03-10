import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [나의함수] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    // routing이 늘 성공하는 것은 아니기 때문에 try 시도해봐! 라는 표현을 쓴다
    try {
      const result = await 나의함수({
        variables: {
          // variables가 $역할을 해주기때문에 한번 더 쓸 필요 없다
          writer: writer, // $writer 랑 state 변수 writer랑 같아도 상관없다, 아예 다른 놈임
          title: title,
          contents: contents,
        },
      });
      console.log(result);
      alert(result.data.createBoard.message);
      console.log(result.data.createBoard.number);
      // router.push("/05-10-dynamic-routed-board-mutation/" + result.data.createBoard.number)
      router.push(
        `/05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}`
      ); // 템플릿 리터럴로 바꿔주기
    } catch (error) {
      // try에 있는 내용을 시도하다가, 실패하면 아랫줄 모두 무시하고 catch가 실행됨
      alert(error.message);
    }
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
