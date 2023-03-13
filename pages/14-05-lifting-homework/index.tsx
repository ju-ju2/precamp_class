import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../src/commons/types/generated/types";
import BoardNumber from "../../src/components/commons/pagenation/boardNumber";
import BoardsList from "../../src/components/commons/pagenation/boardsList";

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

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function StaticRoutedPage() {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  // const 마지막 페이지 = Math.ceil(전체게시글 / 10)  전체 게시물에서 10을 나누고 올림하면 필요한 전체 페이지 수가 나온다. 10개씩 한페이지가 구성되니까

  return (
    <>
      <BoardsList data={data}></BoardsList>
      <BoardNumber
        dataBoardsCount={dataBoardsCount}
        refetch={refetch}
      ></BoardNumber>
    </>
  );
}
