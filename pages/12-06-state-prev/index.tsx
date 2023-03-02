import { useState } from "react";

export default function CounterLetDocumentPage() {
  const [count, setCount] = useState(0);

  // function onClickCountUp() {

  //   setCount(count + 1);

  //   setCount(count + 1);

  //   setCount(count + 1);

  //   setCount(count + 1);

  //   // 임시저장공간에 계속 카운트는 0으로 남아있기때문에 순환을 해도 최종 1밖에 안오른다.
  // }

  function onClickCountUp() {
    setCount((prevState) => prevState + 1);

    setCount((prevState) => prevState + 1);

    setCount((prevState) => prevState + 1);

    setCount((prevState) => prevState + 1);

    // 임시 저장공간에 1이 있으면 다음루틴에서 1을 가져온다. 최종적으로 4씩 더해지는 구조
  }

  return (
    <>
      <div>{count}</div>
      {/* 변수는 {} 써야함 */}
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
    </>
  );
}

// 기존방식 : let name = '주연'
//          name = '상헌'

// const [name, setName] = useState('주연')
// setName('상헌')
