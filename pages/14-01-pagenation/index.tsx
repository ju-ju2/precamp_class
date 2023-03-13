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

  // data?.fetchBoards 는 배열이기 때문에 map 가능

  const onClickPage = async (event: MouseEvent<HTMLSpanElement>) => {
    await refetch({ page: Number(event.currentTarget.id) });
    // void써도 상관없다. 아래 로직에 이패치 받은걸로 어떤걸 하면 무조건 await를 써줘야함
    // currentTarget: 현재 클릭한 현재 타겟 vs eventTarget: 이미지, 파일 등 여러곳에 들어가기 때문에 태그가 아닐수도있어서 무조건 아이디가 있음을 보장할 수 없다.
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

      {/* 4. 3을 간단하게 표현하는 법   10개가 들어가는 배열을 만들고 그것을 1로 채운다는 뜻 */}

      {new Array(10).fill(1).map((_, index) => (
        <span key={index} id={String(index)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))}

      {/* 3. el을 쓰지않고 index로 map적용하기,   el을 쓰지 않을때 _(언더바)로 표현하는 법 */}

      {/* {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
        <span key={index} id={String(index)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))} */}

      {/* 2. 배열 만들어서 map 적용하는 방법 */}

      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
        <span key={el} id={String(el)} onClick={onClickPage}>
          {el}
        </span>
      ))} */}

      {/* 1. 가장 기본적인 방법 */}
      {/* <span id="1" onClick={onClickPage}>
        1
      </span>
      <span id="2" onClick={onClickPage}>
        2
      </span>
      <span id="3" onClick={onClickPage}>
        3
      </span> */}
    </>
  );
}
