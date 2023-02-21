import { useState } from "react";

export default function CounterLetDocumentPage() {
  const [count, setCount] = useState(0);

  function onClickCountUp() {
    setCount(count + 1);
  }

  function onClickCountDown() {
    setCount(count - 1);
  }

  return (
    <>
      <div>{count}</div>
      {/* 변수는 {} 써야함 */}
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
      <button onClick={onClickCountDown}>카운트 내리기!!</button>
    </>
  );
}

// 기존방식 : let name = '주연'
//          name = '상헌'

// const [name, setName] = useState('주연')
// setName('상헌')
