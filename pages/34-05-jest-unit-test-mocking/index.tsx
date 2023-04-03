import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

// prettier-ignore
export const CREATE_BOARD = gql`
  mutation typeSetting($createBoardInput:CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const router = useRouter();

  const [나의함수] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer,
          title,
          contents,
          password: "1234",
        },
      },
    });
    console.log(result);
    // alert(result.data.createBoard.message);
    router.push(`/boards/${result.data?.createBoard._id}`);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  return (
    <>
      작성자:{" "}
      <input role="input-writer" type="text" onChange={onChangeWriter}></input>
      <br />
      제목:{" "}
      <input role="input-title" type="text" onChange={onChangeTitle}></input>
      <br />
      내용:{" "}
      <input
        role="input-contents"
        type="text"
        onChange={onChangeContents}
      ></input>
      <br />
      <button role="submit-button" onClick={onClickSubmit}>
        GRAPHQL-API(동기)요청하기
      </button>
    </>
  );
}
