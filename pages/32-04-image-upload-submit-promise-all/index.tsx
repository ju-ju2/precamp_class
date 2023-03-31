import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
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

const CREATE_BOARD = gql`
  mutation typeSetting($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function ImageUploadPage() {
  // const [imageUrl, setImageUrl] = useState(""); // 임시 url 저장공간
  // const [file, setFile] = useState<File>(); // 진짜 뮤테이션 날릴 파일
  const [imageUrls, setImageUrls] = useState(["", "", ""]); // 임시 url 저장공간
  const [files, setFiles] = useState<File[]>([]); // 진짜 뮤테이션 날릴 파일

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [createBoard] = useMutation(CREATE_BOARD);

  // 올리기 버튼 한번으로 uploadFile 과 createBoard 뮤테이션 동시에 날리기
  const onClickSubmit = async () => {
    // // 1. Promise.all 안쓸 때
    // const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    // const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    // const url0 = resultFile0.data?.uploadFile.url;
    // const url1 = resultFile1.data?.uploadFile.url;
    // const url2 = resultFile2.data?.uploadFile.url;
    // const resultUrls = [url0, url1, url2];

    // // 2. Promise.all 쓸 때
    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);
    // console.log(results); // [resultFile0, resultFile1, resultFile2]
    // const resultUrls = results.map((el) => (el ? el.data?.uploadFile.url : ""));

    // 3. Promise.all 쓸 때 - 리팩토링
    // files - [file0, file1, file2]
    // files.map((el)=>(uploadFile({ variables: { file: el } })))
    // [uploadFile({ variables: { file: files[0] } }), uploadFile({ variables: { file: files[1] } }), uploadFile({ variables: { file: files[2] } })]
    const results = await Promise.all(
      files.map((el) => el && uploadFile({ variables: { file: el } }))
    );
    console.log(results); // [resultFile0, resultFile1, resultFile2]
    const resultUrls = results.map((el) => (el ? el.data?.uploadFile.url : ""));

    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목",
          contents: "내용",
          images: resultUrls, // [url0, url1, url2]
        },
      },
    });
    console.log(result);
    alert("등록 완료!");
  };

  const onChangeFile =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]; // 파일의 0번째 배열에 있는 객체 가져오기
      if (!file) return;

      // 2. 임시 url 생성 - 진짜 url(다른 브라우저에서도 접근 가능)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          console.log(event.target?.result);
          // setImageUrl(event.target?.result);
          // setFile(file);

          // 배열을 저장하기위한 로직 추가
          const tempUrls = [...imageUrls]; // 원본을 바꾸지 않기위한 임시 저장
          tempUrls[index] = event.target?.result; // 해당 URL을 자기 인덱스 위치에 넣는다.
          setImageUrls(tempUrls);

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };

  return (
    <>
      <input type="file" onChange={onChangeFile(0)}></input>
      <input type="file" onChange={onChangeFile(1)}></input>
      <input type="file" onChange={onChangeFile(2)}></input>
      <img src={imageUrls[0]} />
      <img src={imageUrls[1]} />
      <img src={imageUrls[2]} />
      <button onClick={onClickSubmit}>게시물 올리기</button>
    </>
  );
}

// 기존 사진 업로드 방식의 문제점
// 1. 사진을 선택하고 클라우드에서 url을 받기만 하고 브라우저 창을 나가게 되면 클라우드에 찌꺼기가 남게된다.
// 2. 뮤테이션을 통해 클라우드에 url을 받고 setImageUrl해서 이미지를 바꾸려면 시간이 오래 걸린다.
