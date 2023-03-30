import { useCallback, useMemo, useState } from "react";
import MemoizationChildPage from "./01-child";

export default function MemoizationParentsPage() {
  console.log("부모가 랜더링 됩니다.");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // 1. useMemo()로 변수 기억하기
  // setState가 변경되면서 계속 리랜더링되던 랜덤 수가 동일하게 나오는 것을 볼 수 있다.

  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);

  // 2. useCallback 으로 함수 기억하기
  // useCallback 은 useMemo와 마찬가지로 ()={이 부분에 들어간 함수를  저장한다}
  const onClickCountLet = useCallback(() => {
    // countLet = countLet + 1
    countLet += 1;
    console.log(countLet);
  }, []);

  // 3. useCallBack 사용시 주의 사항 : state 사용 시 주의
  //   const onClickCountState = useCallback(() => {
  //     // console.log(countState + 1);
  //     // setCountState(countState + 1);
  //     // state가 1로 지정되기 때문에 계속 1만 반환하는 문제가 생겨 prev로 대체
  //     setCountState((prev) => prev + 1);
  //   }, []);

  //   4. useMemo로 나만의 useCallback 만들기
  const onClickCountState = useMemo(
    () => () => {
      setCountState((prev) => prev + 1);
    },
    []
  );

  return (
    <>
      <div>---------------------</div>
      <h1>저는 부모 컴포넌트 입니다.</h1>

      <div> 카운트(let) : {countLet} </div>
      <button onClick={onClickCountLet}>카운트(let) +1 올리기</button>
      <div>카운트(state) : {countState}</div>

      <button onClick={onClickCountState}>카운트(state) +1 올리기</button>
      <div>---------------------</div>
      <MemoizationChildPage />
    </>
  );
}
