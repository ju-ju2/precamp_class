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
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data);
  console.log(data?.fetchBoards);

  // data?.fetchBoards 는 배열이기 때문에 map 가능

  const onClickPage = async (event: MouseEvent<HTMLSpanElement>) => {
    await refetch({ page: Number(event.currentTarget.id) });
    // void써도 상관없다. 아래 로직에 이패치 받은걸로 어떤걸 하면 무조건 await를 써줘야함
    // currentTarget: 현재 클릭한 현재 타겟 vs eventTarget: 이미지, 파일 등 여러곳에 들어가기 때문에 태그가 아닐수도있어서 무조건 아이디가 있음을 보장할 수 없다.
  };

  const onClickPrevPage = async () => {
    setStartPage((prev) => prev - 10);
    await refetch({ page: startPage - 10 });
  };
  const onClickNextPage = async () => {
    setStartPage((prev) => prev + 10);
    // 기존 값에 10을 더하는 로직
    // setStartPage(startPage + 10) 해도 된다.
    await refetch({ page: startPage + 10 });
  };

  return (
    <>
      {/* 1. 한줄로 쓰는 경우 */}
      {/* {data?.fetchBoards.map((el) => 
        { return <div>
          {el.number}
          {el.writer}
          {el.title}
          {el.contents}
        </div>}
      )} */}

      {/* 2. 각 값에 다른 css를 주고싶을때 */}
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
        </Row>
      ))}

      <span onClick={onClickPrevPage}>이전페이지</span>
      {new Array(10).fill(1).map((_, index) => (
        <span
          key={index + startPage}
          id={String(index + startPage)}
          onClick={onClickPage}
        >
          {index + startPage}
        </span>
      ))}
      <span onClick={onClickNextPage}>다음페이지</span>
    </>
  );
}
