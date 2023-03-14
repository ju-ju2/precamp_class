import Router, { useRouter } from "next/router";
// class는 훅을 못가져오기때문에 중괄호를 빼고 빠로 써주면 된다
import { Component, useEffect, useState } from "react";
// render를 쓰기위해 Component를 가져와야되고 아래 Class를 만들 때 extents Component 한다. 우리가 쓰는 컴포넌트처럼 만드는 것

export default function FunctionLifecyclePage() {
  // 컴포넌트에서 변수 생성방법

  const [count, setCount] = useState(0);
  const [qqq, setqqq] = useState(0);
  // state = {
  //   count: 0,
  // };

  // componentDidMount() {
  //   console.log("그려지고 나서 실행");
  // }
  useEffect(() => {
    console.log("처음만 실행");
  }, []);
  // 의존성 배열을 빈칸으로 두면 처음 실행될 때 한번만 실행된다. 바뀔 대상이 없다!

  // componentDidUpdate() {
  //   console.log("변경되고 나서 실행 + 처음엔 실행안됨");
  //   // if (this.state.count === 5)
  // }
  useEffect(() => {
    console.log("변경되고나서 실행 + 처음에도 실행됨");
  }, [count, qqq]);
  // 뒤의 []는 의존성 배열이다. []에 들어있는 애가 변경될 때만 useEffect가 실행된다. 의존성 배열이 없으면 뭐 하나라도 바뀌면 무조건 실행

  // componentWillUnmount() {
  //   console.log("사라질때 실행");
  //   // 채팅방 나가기 api
  // }
  useEffect(() => {
    return () => {
      console.log("사라질때 실행");
    };
  }, []);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  // onClickCountUp = () => {
  //   this.setState((prev: { count: number }) => ({
  //     count: prev.count + 1,
  //   }));
  // };

  const onClickMove = () => {
    const Router = useRouter();
    void Router.push("/");
  };

  // onClickMove() {
  //   void Router.push("/");
  // }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
      <button onClick={onClickMove}>나가기</button>
    </>
  );
}
