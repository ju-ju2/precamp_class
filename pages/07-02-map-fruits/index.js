//백엔드에서 받아온 데이터라고 가정(컴포넌트 위에 만든 이유 : 컴포넌트 리렌더링 되어도 다시 안만들어짐 )

const FRUIT = [
  {
    number: 1,
    title: "레드향",
  },
  {
    number: 2,
    title: "샤인머스켓",
  },
  {
    number: 3,
    title: "산청딸기",
  },
  {
    number: 4,
    title: "한라봉",
  },
  {
    number: 5,
    title: "사과",
  },
  {
    number: 6,
    title: "애플망고",
  },
  {
    number: 7,
    title: "딸기",
  },
  {
    number: 8,
    title: "천혜향",
  },
  {
    number: 9,
    title: "과일선물세트",
  },
  {
    number: 10,
    title: "귤",
  },
];

export default function MapFruitsPage() {
  //1번
  const aaa = [
    <div>1 레드향</div>,
    <div>2 샤인머스켓</div>,
    <div>3 산청딸기</div>,
  ];
  //리턴 {aaa}로 들어갈때는 []와 ,가 사라진다
  //   return <>{aaa}</>;

  //2번 : 1번이랑 결과 똑같다
  const bbb = [
    { number: 1, title: "레드향" },
    { number: 2, title: "샤인머스켓" },
    { number: 3, title: "산청딸기" },
  ].map((el) => (
    <div>
      {el.number} {el.title}
    </div>
  ));

  //   return <>{bbb}</>;

  //3번

  return (
    <>
      {FRUIT.map((el) => (
        <div>
          {el.number} {el.title}
        </div>
      ))}
    </>
  );
}
