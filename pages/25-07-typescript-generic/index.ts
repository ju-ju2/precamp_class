import { useState } from "react";

// 1. 문자/숫자/불린(primitive) 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean) => {
  return [arg3, arg2, arg1];
};
const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입 => 그냥 자바스크립트랑 같음
const getAny = (arg1: any, arg2: any, arg3: any) => {
  console.log(arg1 + 100); // any는 아무거나 다 됨
  return [arg3, arg2, arg1];
};
const result = getAny("철수", 123, true);

//
//
// 3. unknow 타입 => 그냥 자바스크립트랑 같음
const getUnknow = (arg1: unknown, arg2: unknown, arg3: unknown) => {
  if (typeof arg1 === "number") console.log(arg1 + 100); // 쓰려면 타입을 가정해야 한다. any와는 다르게 제한을 두며 사용함.
  return [arg3, arg2, arg1];
};
const result = getUnknow("철수", 123, true);

//
//
// 4. generic 타입 - 1
// const 함수이름<쓸 타입 이름>(인자: 타입 지정): [리턴 타입 지정]{}
function getGeneric<myType1, myType2, myType3>(arg1: myType1, arg2: myType2, arg3: myType3): [myType3, myType2, myType1] {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
}
const result = getGeneric("철수", 123, true); // 타입 추론 가능
const result = getGeneric<number, number, number>(111, 222, 333); // 타입 지정
// 어떤 타입의 인자를 넣든 상관 없지만 넣게 되면 해당 타입으로 들어간다.
// const [count, setCount] = useState<string>("철수") // <타입지정>

//
//
// 4. generic 타입 - 2 // 지정 명은 의미 없음
function getGeneric2<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
}
const result = getGeneric2("철수", 123, true); // 타입 추론 가능

// 라이브러리를 만들어 배포하는 사람의 입장애서 어떤 타입을 사용자가 쓸지 모르니 사용자들이 타입추론을 용이하게 하기 위해 제네릭을 쓰고 있다.

//
//
// 4. generic 타입 - 3 // 화살표 함수로 적용 시
const getGeneric3 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};
const result = getGeneric3("철수", 123, true); // 타입 추론 가능
