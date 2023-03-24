import { useForm } from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
}
export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm<IFormData>();
  //   const [aaa, setAaa] = useState('') // 이는 ""때문에 타입 추론이 가능했지만, useForm()에는 뭐가 들어올지 모르기때문에 타입 추론이 불가능하다. useState<string>('') 처럼 타입을 지정해야한다.
  // register 안에 onChange/ const / setState 등의 기능이 있다.

  const onClickSubmit = (data: IFormData) => {
    console.log(data);
  };
  // 로그에 데이터가 등록된다. 바로 mutation 날릴 수 있다.

  console.log("리랜더링 되나요?");
  // setState와 다르게 리랜더링이 되지 않는 비제어 컴포넌트이기 떄문에 성능이 좋다

  return (
    // <form onSubmit={onClickSubmit}> // 이건 onClickSubmit이라는 함수를 실행만 시켜줄 뿐이다.
    <form onSubmit={handleSubmit(onClickSubmit)}>
      {/* handleSubmit으로 감싸주면 아래 register를 가져올 수 있다. */}
      작성자: <input type="text" {...register("writer")} />
      제목: <input type="text" {...register("title")} />
      내용: <input type="text" {...register("contents")} />
      {/* 주소: <input type="text" {...register("boardAddress.addressDetail")} />  // 자동으로 객체로 넘겨준다 */}
      <button>등록하기</button>
      {/* <button>등록하기</button> // 디폴트값이 submit이기 때문에 굳이 타입을 지정하지 않아도 onSubmit에 실행된다  */}
      {/* <button type="button" onClick={onClickBtn}>등록하기</button> 내가 만든 함수를 실행시키고 싶을 때 */}
    </form>
  );
}

// *** 매우 중요
// <form>으로 감쌀떄 실행되는 함수는 default값이 type="submit" 이므로 type값을 button으로 꼭 지정해야한다

// html에서 버튼 방식
/*
   <button type="button">나만의 버튼</button> // 내가 만든 함수를 실행시키고 싶을 떄
   <button type="submit">보내기</button> // 기본 값
   <button type="reset">지우기</button>
*/
