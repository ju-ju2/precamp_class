import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
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

const DELETE_BOARD = gql`
  mutation typeSetting($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation typeSetting($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickDelete = (boardId: string) => () => {
    void deleteBoard({
      variables: { boardId },
      // refetchQueries: [{ query: FETCH_BOARDS }], // 규모가 작은 서비스(데이터가 많이 없는 서비스)가 쓰기 편함
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              // 객체에서 키값을 읽고싶을때는 readField를 써야함
              const deletedId = data.deleteBoard; // 삭제된 아이디
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId // el._id가 안되므로, readField를 사용해서 가져오기
              );
              return [...filteredPrev]; // 9개가 남게됨
            },
          },
        });
      },
      // 등록하고 받은 결과를 data로 받아오기
    });
  };
  const onClickCreate = async () => {
    await createBoard({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "제목",
          contents: "내용",
        },
      },
      // refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };
  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </Row>
      ))}
      <button onClick={onClickCreate}>등록하기</button>
    </>
  );
}

// 추가적인 리패치를 요청하는 것이 아니라 캐시를 직접 수정하자! (대규모 서비스에 적합)

// 유의미한곳: 무한스크롤을 포함한 대부분
// 무의미한곳: 게시판 (10개씩 끊어서 보여줘야하는 곳)
