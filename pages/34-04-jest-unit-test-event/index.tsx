import { useState } from "react";

export default function CounterLetDocumentPage() {
  const [count, setCount] = useState(0);

  function onClickCountUp() {
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <div role="count">{count}</div>
      {/* 변수는 {} 써야함 */}
      <button role="count-button" onClick={onClickCountUp}>
        카운트 올리기!!
      </button>
    </>
  );
}
