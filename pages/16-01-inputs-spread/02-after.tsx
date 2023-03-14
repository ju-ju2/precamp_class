// args 는 arguments로 인자가 들어가는 것을 뜻한다
// 아래의 값들이 지정하는 것이 아닌 인풋창에 입역되는 값으로 들어가는 것

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

// $는 변수라는 말
// const CREATE_BOARD = gql`
//   mutation createBoard($writer: String, $title: String, $contents: String) { //변수의 타입 적는 란
//     createBoard(
//       writer: $writer                  //실제 우리가 전달할 변수
//       title: $title
//       contents: $contents
//     ) {
//       _id
//       number
//       message
//     }
//   }
// `

const CREATE_BOARD = gql`
  mutation typeSetting($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function InputsSpread() {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  // const [writer, setWriter] = useState("");
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState("");

  const [나의함수] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // 1.
        // writer,
        // title,
        // contents,

        // 2.
        // writer: inputs.writer,
        // title: inputs.title,
        // contents: inputs.contents,

        // 3.

        ...inputs,
      },
    });
    alert(result.data.createBoard.message);
  };

  const onChangeInputs = (event) => {
    // 1. setWriter(event.target.value);

    // 2. setInputs({
    //   writer: event.target.value,
    //   title: inputs.title ,
    //   contents: inputs.contents
    // })

    // 3. setInputs({...inputs, writer: event.target.value})

    // 4. 왼쪽에 대괄호는 변수를 발하는 것임
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  return (
    <>
      작성자: <input id="writer" type="text" onChange={onChangeInputs}></input>
      <br />
      제목: <input id="title" type="text" onChange={onChangeInputs}></input>
      <br />
      내용: <input id="contents" type="text" onChange={onChangeInputs}></input>
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기)요청하기</button>
    </>
  );
}
