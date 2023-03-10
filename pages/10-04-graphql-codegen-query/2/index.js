import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query typeSetting($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  // useMutation은 내가 페이지에서 실행시켜야지만 실행되지만 useQuery는 페이지를 열자마자 실행된다.
  // 그래서 데이터 값을 바로 넣어줘야한다
  const { data } = useQuery(FETCH_BOARD, { variables: { number: 400 } });

  console.log(data);

  return (
    <>
      <div>2번 페이지로 이동이 완료되었습니다.</div>
      {/* 위에서 데이터가 아직 받아오지 않았기때문에 아래처럼 표현하면 에러난다. 하지만 await를 쓰지않는다, useQuery가 그렇게 안만들어져있어서 써도 먹히지 않는다.
      데이터가 있으면 보여줘! 이기 떄문에 조건문을 추가한다 : 조건부 랜더링 */}
      {/* <div>{data.fetchBoard.writer}</div> */}
      <div>{data && data.fetchBoard.writer}</div>
      {/* &&연산자 방식 */}
      <div>{data ? data.fetchBoard.title : "데이터를 받아오는 중입니다"}</div>
      {/* 삼항연산자 방식 */}
      <div>{data?.fetchBoard.contents}</div>
      {/* 옵셔널 체인 방식, 가장 많이 쓰이는 방식 */}
    </>
  );
}
