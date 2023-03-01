export default function TypescriptUtilityPage() {
  interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby: string;
  }

  //위의 interface 표현이랑 똑같음
  // type IProfile2 = {
  //     name: string
  //     age: number
  //     school: string
  //     hobby: string
  // }

  // 기존에 있던것을 조작변형해서 만드는게 유틸리티 타입이다. 나만의 새로운 타입으로 만드는것

  //1. pick타입    //원하는 키만 뽑아오기
  type aaa = Pick<IProfile, "name" | "age">;

  //2. Omit 타입   //선택하는 키만 제외하기
  type bbb = Omit<IProfile, "school">;

  //3. Partial 타입   //있어도되고 없어도되는 타입
  type ccc = Partial<IProfile>;

  //4. Required 타입  //전부 다 필수
  type ddd = Required<IProfile>;

  //5. Record 타입
  type eee = "철수" | "영희" | "훈이"; //Union타입 string타입 중에서도 철수, 영희, 훈이만
  let child: eee;
  child = "영희";

  type fff = Record<eee, IProfile>; //분리한거에 1:1로 타입을 매치시키는것

  // ==========  (type vs interface) 차이 : 선언병합 ========   //위에서 IProfile을 선언한것에 합쳐진다
  interface IProfile {
    candy: number;
  }

  let profile: Partial<IProfile> = {};
  profile.candy = 10;
}
