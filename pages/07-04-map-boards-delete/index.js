import { gql, useMutation, useQuery } from "@apollo/client";
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

const DELETE_BOARD = gql`
  mutation typeSetting($number: Int) {
    deleteBoard(number: $number) {
      _id
      number
      message
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
  const [deleteData] = useMutation(DELETE_BOARD);

  console.log(data);
  console.log(data?.fetchBoards);

  const onClickDelete = async (event) => {
    const result = await deleteData({
      variables: {
        number: Number(event.target.id),
        //event.target은 코드 라인을 가져온다. 그래서 버튼에 id를 주고 그 변수를 가져온다
        // html에서 가져온 코드이기 때문에 항상 문자열이기 때문에 넘버링을 해줘야한다
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
      // 삭제하고 새로고침을 해야 다시 데이어를 보여주므로 바로 다시 패치보드를 작성하는 리패치쿼리를 사용한다.
    });
    console.log(result.data.deleteBoard.message);
    // alert(result.data.deleteBoard.message);
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el.number}>
          {/* 키는 중복되지 않는것으로 줘야한다. 다 다른애들인지 알수 있도록 -> 줄 삭제하면 통째로 날릴 수 있도록 */}
          <Column>
            <input type="checkbox"></input>
          </Column>
          <Column>{el.number}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
          <Column>{el.contents}</Column>
          <Column>
            <button id={el.number} onClick={onClickDelete}>
              삭제
            </button>
          </Column>
        </Row>
      ))}
    </>
  );
}
