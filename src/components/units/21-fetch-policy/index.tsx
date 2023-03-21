import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function FetchPolicyExample() {
  const { data } = useQuery(FETCH_BOARDS); // 기본은 {fetchPolicy: "cache-first"} 라 글로벌 스테이트에 저장된 패치보드를 쓴다.
  // (FETCH_BOARDS, { fetchPolicy: "network-only" }) 형식은 무조건 데이터 다시 불러오기
  // 개발도구창의 네트워크부분에서 확인 가능
  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el}>{el.writer}</div>
      ))}
    </>
  );
}
