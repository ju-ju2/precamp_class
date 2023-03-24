import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yub from "yup";
import Input01 from "../../src/components/commons/inputs/01";
import Button01 from "../../src/components/commons/buttons/01";

// schema는 구조를 의미하며 데이터테이블에서 column이다.
const schema = yub.object({
  writer: yub.string().required("작성자를 입력해주세요."),
  title: yub.string().required("제목을 입력해주세요."),
  contents: yub.string().required("내용을 입력해주세요."),
  password: yub.string().required("비밀번호를 입력해주세요"),

  // email: yub
  //   .string()
  //   .email("이메일 형식을 지켜주세요.")
  //   .required("이메일은 필수 입력입니다"),
  // password: yub
  //   .string()
  //   .min(4, "비밀번호는 최소 4자리 이상 입력해주세요.")
  //   .max(15, "비밀번호는 최대 15자리로 입력해주세요.")
  //   .required("비밀번호는 필수 입력입니다."),
  // phone: yub
  //   .string()
  //   .matches(/^\d(3)-\d(3,4)-\d(4)$/, "휴대폰 형식에 맞지 않습니다.")
  //   .required("휴대전화번호는 필수 입력입니다."),
});

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  password: string;
}
export default function ReactHookFormWithYubPage() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange", // 제어컴포넌트로 바꾸는 것 // 입력하고 버튼 누를 때 마다 검증하고 싶을때(빨간 경고 띄우고 싶을때)
  });

  const onClickSubmit = (data: IFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      {/* 작성자: <input type="text" {...register("writer")} /> */}
      작성자: <Input01 type="text" register={register("writer")} />
      <div>{formState.errors.writer?.message}</div>
      제목: <Input01 type="text" register={register("title")} />
      <div>{formState.errors.title?.message}</div>
      내용: <Input01 type="text" register={register("contents")} />
      <div>{formState.errors.contents?.message}</div>
      비밀번호: <Input01 type="password" register={register("password")} />
      <div>{formState.errors.password?.message}</div>
      {/* <button style={{ backgroundColor: formState.isValid ? "yellow" : "" }}>
        등록하기
      </button> */}
      <Button01 title="등록하기" isActive={formState.isValid} />
    </form>
  );
}

// 에러메시지는 상황에 따라 다르기때문에 input에 합치지 않고 컴포넌트를 분리하던 <div>태그로 만들던
// 미래에 업드레이드된 복잡해지고 고도화된 상태에서 페이지의 특성에 따라 조정한다.
