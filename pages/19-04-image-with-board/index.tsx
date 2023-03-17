// args 는 arguments로 인자가 들어가는 것을 뜻한다
// 아래의 값들이 지정하는 것이 아닌 인풋창에 입역되는 값으로 들어가는 것

import { Modal } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { checkValidationFile } from "../../src/commons/libraries/validation";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation typeSetting($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation typesetting($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      size
    }
  }
`;

export default function GraphqlMutationPage() {
  const fileRef = useRef<HTMLInputElement>(null); // 참조할 변수를 생성 (null): 처음에는 비워져있다
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer,
          password: "1234",
          title,
          contents,
          images: [imageUrl], // 지금은 이미지가 하나이기 떄문에 하나만 담아 들어감
        },
      },
    });
    console.log(result);
    alert("등록 완료!");
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

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 파일의 0번째 배열에 있는 객체 가져오기

    const isValid = checkValidationFile(file);
    if (!isValid) return;
    // 불러온 함수(checkValidationFile)를 종료하는것인지 onChangeFile을 종료하는 것인지 알수없기 때문에 true/false를 받아온다

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      console.log(result.data?.uploadFile.url);
      setImageUrl(result.data?.uploadFile.url ?? ""); // 또는 (||) 이 안되서 ??
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
    // test라는 변수를 참조하는 현재 태그를 클릭
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
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "gray" }}
        onClick={onClickImage}
      >
        이미지 선택
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef} // 변수를 참조하는 태그
        // accept="image/png" // 이미지 선택할때 png파일 빼고 선택이 안된다.
      ></input>
      {/* <input type="file" onChange={onChangeFile} multiple></input> */}
      {/* 사진 여러개 등록하고 싶을때 */}
      <img src={`https://storage.googleapis.com/${imageUrl}`}></img>
    </>
  );
}
