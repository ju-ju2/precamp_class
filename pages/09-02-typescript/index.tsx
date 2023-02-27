export default function Qqq() {
  //타입 추론 : 타입을 예측해서 string을 입력하지 않아도 적용이 됨
  let aaa = "안녕하세요";
  // aaa = 123

  //타입명시
  let bbb: string = "반갑습니다";

  //문자 타입 (선언과 할당 분리)
  let ccc: string;
  ccc = "반가워요!";

  //숫자 타입
  let ddd: number = 10;
  // ddd = "ss"

  //불린 타입
  let eee: boolean = true;
  eee = false;
  // eee = "false"  //문자열에 뭐라도 들어가있으면 true지만 문자열이기 때문에 안됨

  //배열 타입
  let fff: number[] = [1, 2, 3];
  let ggg: string[] = ["철수", "영희"];
  // let hhh = ["철수", "영희", "짱구", 10]
  let hhh: (string | number)[] = ["철수", "영희", "짱구", 10]; //타입을 모르겠을때는 일단 적어서 마우스 오버해보면 됨

  //객체 타입  -타입을 키마다 각자 지정해줘야한다.

  interface IProfile {
    name: string;
    age: number | string; //숫자 또는 문자
    school: string;
  }

  const profile: IProfile = {
    name: "철수",
    age: 12,
    school: "다람쥐초등학교",
  };
  profile.age = "8살";

  //함수 타입
  // 함수는 어디서 몇번이던 호출 가능하므로, 또 함수는 할당이 아니기때문에 초기값이 없어서 어떤값을 추론해야하는지에 타입추론이 불가능하다 (반드시 타입명시 필요)
  const add = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit;
  };
  const result = add(1000, 2000, "원"); //결과의 리턴 타입도 예측 가능

  // any타입
  let qqq: any = "철수"; // 자바스크립트 타입
  qqq = 3;
  qqq = true;
  return <></>;
}
