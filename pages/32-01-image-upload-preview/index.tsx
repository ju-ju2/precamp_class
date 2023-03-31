import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

// const UPLOAD_FILE = gql`
//   mutation typesetting($file: Upload!) {
//     uploadFile(file: $file) {
//       _id
//       url
//       size
//     }
//   }
// `;

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  //   const [uploadFile] = useMutation<
  //     Pick<IMutation, "uploadFile">,
  //     IMutationUploadFileArgs
  //   >(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 파일의 0번째 배열에 있는 객체 가져오기
    if (!file) return;
    // try {
    //   const result = await uploadFile({
    //     variables: {
    //       file,
    //     },
    //   });
    //   console.log(result.data?.uploadFile.url);
    //   setImageUrl(result.data?.uploadFile.url ?? ""); // 또는 (||) 이 안되서 ??
    // } catch (error) {
    //   if (error instanceof Error) Modal.error({ content: error.message });
    // }

    // 자체에서 미리보기 생성
    // 1. 임시 url 생성 - 가짜(내 브라우저에만 접근 가능) // 훨씬 간단하지만 최근 기술이기 떄문에 지원되지 않는 브라우저도 있음

    // console.log(file);
    // const result = URL.createObjectURL(file);
    // setImageUrl(result);
    // console.log(result);

    // 2. 임시 url 생성 - 진짜 url(다른 브라우저에서도 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        console.log(event.target?.result);
        setImageUrl(event.target?.result);
      }
    };
  };

  return (
    <>
      <input type="file" onChange={onChangeFile}></input>
      {/* <input type="file" onChange={onChangeFile} multiple></input> */}
      {/* 사진 여러개 등록하고 싶을때 */}
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`}></img> */}
      <img src={imageUrl} />
    </>
  );
}

// 기존 사진 업로드 방식의 문제점
// 1. 사진을 선택하고 클라우드에서 url을 받기만 하고 브라우저 창을 나가게 되면 클라우드에 찌꺼기가 남게된다.
// 2. 뮤테이션을 통해 클라우드에 url을 받고 setImageUrl해서 이미지를 바꾸려면 시간이 오래 걸린다.
