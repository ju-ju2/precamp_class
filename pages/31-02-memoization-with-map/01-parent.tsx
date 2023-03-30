import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Word from "./02-child";

export default function MemoizationParentsPage() {
  const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었다");

  console.log(data.split(" "));
  const onCLickChange = () => {
    setData("영희는 오늘 저녁을 맛없게 먹었다");
  };
  return (
    <>
      {/* {data.split(" ").map((el, index) => (
        <Word key={index} el={el}></Word>
        // 1. memo 시 key 또는 el이 변경된 부분만 리랜더링 됨(즉, "오늘", "먹었다" 는 제외)
      ))} */}
      {data.split(" ").map((el, index) => (
        <Word key={uuidv4()} el={el}></Word>
        // 2. uuid 사용 시 매번 다른 키를 주기 때문에 memo를 해도 먹히지 않는다.
        // uuid는 남용하지 않는 것이 좋다.
      ))}
      <button onClick={onCLickChange}>change</button>
    </>
  );
}
