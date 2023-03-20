import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import _ from "lodash";

const FETCH_BOARDS = gql`
  query typeSetting($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
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
  // const [search, setSearch] = useState("");
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data);
  console.log(data?.fetchBoards);

  const onClickPage = async (event: MouseEvent<HTMLSpanElement>) => {
    await refetch({ page: Number(event.currentTarget.id) });
  };

  // const onClickSearch = () => {
  //   void refetch({ search, page: 1 }); // 검색을 눌렀을때는 항상 1페이지가 되어야 한다.
  // };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
  }, 500); // 특정시간 추가 입력없다면 실행(1초 이내에 재 입력된것들은 무시함)

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // setSearch(event.target.value);
    // void refetch({ search: event.target.value, page: 1 }); // 입력만 하면 바로 나옴, change를 할 때 마다 refetch가 되어 아주 비효율적이다.
    getDebounce(event.target.value);
  };
  return (
    <>
      검색어 입력: <input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색하기</button> */}
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
        </Row>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))}
    </>
  );
}
