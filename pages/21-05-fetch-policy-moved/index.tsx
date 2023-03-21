import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import FetchPolicyExample from "../../src/components/units/21-fetch-policy";

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

// 페이지 전환 시 페이지가 앱부분부터 다시 리랜더링 되기 때문에 글로벌 스테이트도 초기화 된다.
// 글로벌 스테이트를 유지하기 위해 아폴로 세팅 부분을 수정해야됨 (캐시부분을 함수 위로 빼주기)
// 캐싱을 제대로 하기 위해서는 패치 시 id or _id를 항상 넣어두는게 좋음, 없으면 어설프게 캐싱이 된다.

export default function GlobalStatePage() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery(FETCH_BOARDS);

  const onClickIsOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button onClick={onClickIsOpen}>
        버튼을 클릭하면 새로운 컴포넌트가 나타납니다
      </button>
      {isOpen && <FetchPolicyExample />}
    </>
  );
}
