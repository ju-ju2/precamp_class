import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query typeSetting($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  width: 20%;
`;

export default function StaticRoutedPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  // 여러개를 수정하고 싶다면 useState를 배열로 바꾼다.
  const [myIndex, setMyIndex] = useState([
    false, // index 0
    false, // index 1
    false, // index 2
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onClickEdit = (event: MouseEvent<HTMLButtonElement>) => {
    const qqq = [...myIndex];
    // 깊은 복사를 위해 새로운 배열 생성
    qqq[Number(event.currentTarget.id)] = true;
    setMyIndex(qqq);
  };

  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <div key={index}>
          {!myIndex[index] && (
            <Row key={el._id}>
              <Column>{el.writer}</Column>
              <Column>{el.title}</Column>
              <button id={String(index)} onClick={onClickEdit}>
                수정하기
              </button>
            </Row>
          )}
          {myIndex[index] && (
            <div>
              수정할 내용 : <input type="text" />
              <button>수정완료</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
