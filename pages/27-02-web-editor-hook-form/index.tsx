// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// 다이나믹 임포트
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage() {
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value: string) => {
    console.log(value);

    // register로 값을 등록하지 않고 강제로 값을 등록하는 기능
    // contents 라는 키에 value값을 등록
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // 입력은 되지만 onChange가 트리거 되진않는다.
    // onChange 됐다고 react-hook-form에 강제로 알려주는 기능
    void trigger("contents");
  };

  const onClickSubmit = async () => {
    // code-splitting 코드 스플릿팅 방식 // 다운로드 나눠서 하기
    // 전체 기능 중에서 하나만 작동될때, import가 많아지면 렌더링이 늦어질수 밖에 없기 때문에 동작할지도 모르는 기능은 작동할때만 임포트
    const { Modal } = await import("antd");
    Modal.success({ content: "등록에 성공하였습니다" });
  };
  return (
    <>
      <div>
        작성자: <input type="text" {...register("writer")} />
        <br />
        비밀번호: <input type="password" {...register("password")} />
        <br />
        제목: <input type="text" {...register("title")} />
        <br />
        내용: <ReactQuill onChange={onChangeContents} />
        <br />
        <button onClick={onClickSubmit}>등록하기</button>
      </div>
    </>
  );
}
