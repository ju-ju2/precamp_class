import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";

const FETCH_BOARDS = gql`
  query typeSetting {
    fetchBoards {
      number
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
  const { data } = useQuery(FETCH_BOARDS);

  console.log(data);
  console.log(data?.fetchBoards);

  //data?.fetchBoards 는 배열이기 때문에 map 가능

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
        <Row>
          <Column>
            <input type="checkbox"></input>
          </Column>
          <Column>{el.number}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
          <Column>{el.contents}</Column>
        </Row>
      ))}
    </>
  );
}
