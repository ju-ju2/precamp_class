// 1. 함수를 리턴하는 함수

// aaa() 실행 시 bbb()함수가 리턴됨, 이 bbb함수를 실행시키려면 전체를 다시 실행시키면 됨
// (aaa())() 이러한 형태에서 (aaa()) 바깥 괄호가 생략되어 aaa()()형식으로 표현된다.

function aaa() {
  const apple = 10;

  return function bbb() {
    const banana = 5;
    console.log(banana);
    console.log(apple);
  };
}

aaa()();

// 2. 함수를 리턴하는 함수 - 인자
function aaa(apple) {
  return function bbb(banana) {
    console.log(banana);
    console.log(apple);
  };
}

aaa(2)(3);

// 실행 결과
// 2 => aaa에 넣은 인자값
// 3 => bbb에 넣은 인자값

// 3. 함수를 리턴하는 함수 = 화살표 함수
const aaa = (apple) => {
  return (banana) => {
    console.log(apple);
    console.log(banana);
  };
};

aaa(2)(3);

// 중괄호 생략
const aaa = (apple) => (banana) => {
  console.log(apple);
  console.log(banana);
};

aaa(2)(3);

// 4. 함수를 리턴하는 함수 - 3개
const aaa = (apple) => (banana) => (tomato) => {
  console.log(apple);
  console.log(banana);
  console.log(tomato);
};

aaa(2)(3)(4);
