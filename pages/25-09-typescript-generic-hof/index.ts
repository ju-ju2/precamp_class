// 1. HOF 일반타입

function first1(arg1: string) {
  return function second1(arg2: number): [string, number] {
    return [arg1, arg2];
  };
}

const result = first1("영희")(8);

//
//
// 2. HOF any타입

function first2(arg1: any) {
  return function second2(arg2: any): [any, any] {
    return [arg1, arg2];
  };
}

const result = first2("영희")(8);

//
//
// 3. HOF generic 타입

function first3<T>(arg1: T) {
  return function second3<U>(arg2: U): [T, U] {
    return [arg1, arg2];
  };
}

const result = first3("영희")(8);

//
//
// 4. HOF generic 타입 (화살표 함수)
// prettier-ignore

const first4 = <T>(arg1: T) => <U>(arg2: U):[T, U]=>{
        return[arg1, arg2]
    }

const result = first4("영희")(8);

//
//
// 5. HOC - generic 타입 (컴포넌트에 응용)
// prettier-ignore

const withAuth = <C>(Component: C) => <P>(props: P):[C, P]=>{
    return[Component, props]
}

const result = withAuth("bbb")({ qqq: "철수", zzz: true });
