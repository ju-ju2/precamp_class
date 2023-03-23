import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { MouseEvent } from "react";
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
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data);
  console.log(data?.fetchBoards);

  const onClickPage =
    (boardId: number) => async (event: MouseEvent<HTMLSpanElement>) => {
      await refetch({ page: boardId });
    };

  return (
    <>
      {/* 2. 각 값에 다른 css를 주고싶을때 */}
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
        </Row>
      ))}

      {/* 4. 3을 간단하게 표현하는 법   10개가 들어가는 배열을 만들고 그것을 1로 채운다는 뜻 */}

      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} onClick={onClickPage(index + 1)}>
          {index + 1}
        </span>
      ))}
    </>
  );
}

// onClick={onClickPage} 부분은 실행() 이 없고 바인딩만 되어있는 상태이다.
// 클릭했을때 비로소 ()가 붙으면서 실행이 되는데 위의 onClickPage(index + 1)을 바인딩하면 onClickPage(index+1)() 함수가 실행되어,
// 인자를 두개 받는 hof가 되는 것이다.
