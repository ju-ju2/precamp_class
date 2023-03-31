import { gql, useApolloClient, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { MouseEvent } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { useRouter } from "next/router";
import _ from "lodash";

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

const FETCH_BOARD = gql`
  query typeSetting($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const client = useApolloClient();
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  console.log(data);
  console.log(data?.fetchBoards);

  const getDebounce = _.debounce(async (boardId) => {
    await client.query({
      query: FETCH_BOARD,
      variables: { boardId },
    });
  }, 500);

  const prefetchBoard = (boardId: string) => async () => {
    // useQuery
    // useLazyQuery
    // useApolloClient

    // 아래는 마우스를 갖다 대기만해도 프리페치를 해버려 쓸데없이 데이터를 요청하는 문제가 있다.
    // 디바운싱을 통해 n초 뒤 가장 마지막 부분만 패치하도록 한다.
    // await client.query({
    //   query: FETCH_BOARD,
    //   variables: { boardId },
    // });
    await getDebounce(boardId);
  };

  const onClickMove = (boardId: string) => () => {
    void router.push(`/32-08-data-prefetch-moved/${boardId}`);
  };
  // const onClickPage = async (event: MouseEvent<HTMLSpanElement>) => {
  //   await refetch({ page: Number(event.currentTarget.id) });
  // };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span
            style={{ margin: "10px" }}
            onMouseOver={prefetchBoard(el._id)}
            onClick={onClickMove(el._id)}
          >
            {el.title}
          </span>
        </div>
      ))}
      {/* 
      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))} */}
    </>
  );
}
