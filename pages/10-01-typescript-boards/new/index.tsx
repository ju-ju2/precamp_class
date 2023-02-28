import BoardWrite from "../../../src/components/units/boards/10-write/BoardWrite.container";

export default function GraphqlMutationPage() {
  return <BoardWrite isEdit={false} />;

  // <>{BoardWrite({isEdit: false})}</>
  // 원래 형태는 위의 것임
  //함수 안에 객체 반환해서 아래 컨테이너가 props를 받는것
}
