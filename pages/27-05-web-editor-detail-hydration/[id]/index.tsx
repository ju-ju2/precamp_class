// next에서 [대괄호]를 다이나믹 라우팅으로 인식하기때문에 무조건 외워야함

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Dompurify from "dompurify";

const FETCH_BOARD = gql`
  query typeSetting($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.id },
  });

  console.log(data);

  return (
    <>
      {/* <div>{router.query.number}번 페이지로 이동이 완료되었습니다.</div> */}
      <div style={{ color: "red" }}>작성자: {data?.fetchBoard.writer}</div>
      <div style={{ color: "green" }}>제목: {data?.fetchBoard.title}</div>
      {/* <div>내용: {data?.fetchBoard.contents}</div> */}
      {/* 태그 자체를 실행시키고 싶을때 */}
      {typeof window !== "undefined" ? (
        <div
          style={{ color: "blue" }}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard.contents),
          }}
        />
      ) : (
        <div style={{ color: "blue" }}></div>
      )}
      <div style={{ color: "brown" }}>주소: 양천구</div>
    </>
  );
}

// 하이드레이션 이슈 :  색이 입혀지지 않는 이슈 발생
// 이유: 서버에서 렌더링한 결과랑 브라우저에서 랜더링한 결과가 달라서 그렇다.
//      서버에서는 빨 초 갈 만 그렸지만, 브라우저에는 없던 갈색을 그리라고 하니 문제.
// 해결법 : 서버에서와 브라우저에서 랜더링되는 <태그> 갯수를 맞춰주면 된다. (삼항연산자를 통해 해결)
