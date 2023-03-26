import { useState } from "react";

export default function CounterLetDocumentPage() {
  const result = useState(0);

  function onClickCountUp() {
    // setCount(count + 1);
    // result[1](6);
    result[1]((prev) => prev + 1);
  }

  return (
    <>
      <div>{result[0]}</div>
      {/* 변수는 {} 써야함 */}
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
    </>
  );
}
