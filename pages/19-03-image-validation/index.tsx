import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation typesetting($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      size
    }
  }
`;

export default function ImageUploadPage() {
  const fileRef = useRef<HTMLInputElement>(null); // 참조할 변수를 생성 (null): 처음에는 비워져있다
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 파일의 0번째 배열에 있는 객체 가져오기

    if (!file?.size) {
      alert("파일이 없습니다");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 1B * 1024 = 1KB  / 1024 * 1024 = 1MB
      alert("파일용량이 너무 큽니다. 제한 용량은 5MB입니다");
      return;
    }

    if (
      !file.type.includes("jpeg") &&
      !file.type.includes("jpg") &&
      !file.type.includes("png")
    ) {
      alert("파일 확장자를 확인해주세요! jpeg, png 확장자만 가능");
      return;
    }

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
