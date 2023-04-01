import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query typeSetting($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;
const LIKE_BOARD = gql`
  mutation typeSetting($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;
export default function OptimisticUIPage() {
  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: "642692c9aef9f000281b7e13" },
    }
  );
  const onClickLike = () => {
    void likeBoard({
      variables: { boardId: "642692c9aef9f000281b7e13" },

      // optimisticResponse 가 data를 뜻한다.
      // 진짜로 올리기 전에 눈속임용으로 먼저 올려서 빠르게 보여주기
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      // refetchQueries: [{
      //     query: FETCH_BAORD,
      //     variables: {boardId: ""}
      // }]
      // 기존의 리패치는 데이터를 두번 날리기 때문에 좋은 방식은 아니다. 캐시를 수정하자
      update(cache, { data }) {
        cache.writeQuery({
          // modify: 기존에 있는 value 수정만, writeQuery: 기존에 없던 값도 추가할 수 있다.
          query: FETCH_BOARD,
          variables: { boardId: "642692c9aef9f000281b7e13" },
          data: {
            fetchBoard: {
              _id: "642692c9aef9f000281b7e13",
              _typename: "Board",
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  };
  return (
    <>
      <div>좋아요: {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기</button>
    </>
  );
}
