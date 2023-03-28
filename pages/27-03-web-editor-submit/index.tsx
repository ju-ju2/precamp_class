// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// 다이나믹 임포트
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../src/commons/types/generated/types";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const CREATE_BOARD = gql`
  mutation typeSetting($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function WebEditorPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onChangeContents = (value: string) => {
    console.log(value);

    // register로 값을 등록하지 않고 강제로 값을 등록하는 기능
    // contents 라는 키에 value값을 등록
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // 입력은 되지만 onChange가 트리거 되진않는다.
    // onChange 됐다고 react-hook-form에 강제로 알려주는 기능
    void trigger("contents");
  };

  const onClickSubmit = async (data: any) => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: data.writer,
          title: data.title,
          password: data.password,
          contents: data.contents,
        },
      },
    });
    if (typeof result.data?.createBoard._id !== "string") return;
    const { Modal } = await import("antd");
    Modal.success({ content: "등록에 성공하였습니다" });
    void router.push(
      `/27-04-web-editor-detail/${result.data?.createBoard._id}`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자: <input type="text" {...register("writer")} />
        <br />
        비밀번호: <input type="password" {...register("password")} />
        <br />
        제목: <input type="text" {...register("title")} />
        <br />
        내용: <ReactQuill onChange={onChangeContents} />
        <br />
        <button>등록하기</button>
      </form>
    </>
  );
}
