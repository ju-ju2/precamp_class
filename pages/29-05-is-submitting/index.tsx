import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function IsSubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const {formState} = useForm()
  //   formState.isSubmitting() 도 가능

  const [myData, setMyData] = useState<any>();
  const onClickSubmit = async () => {
    setIsSubmitting(true);
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    setMyData(result);

    setIsSubmitting(false);
  };
  return (
    <>
      <button onClick={onClickSubmit} disabled={isSubmitting}>
        등록하기 등의 API 요청버튼
      </button>
    </>
  );
}

// 원래 setState는 함수안에 중복되어 실행되면 마지막 동작만 최종적으로 실행되는데 여기서는 둘 다 먹혔다.

// onCLickSubmit이 실행되고 await를 만나면서 마이크로 태스크 큐에 들어간다
// 들어가면서 setIsSubmitting(true); 에 한 흐름을 끊고 가기 때문에
// setIsSubmitting(true)/ setIsSubmitting(false)가 둘다 가능했던것
