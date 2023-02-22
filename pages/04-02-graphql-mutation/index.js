import { gql, useMutation } from "@apollo/client";

// graphql에서 썼던 로직 그대로 가져오기
// 미리 셋팅해놓는 구조
const CREATE_BOARD = gql`
  mutation {
    createBoard(
      writer: "철수"
      title: "철수가 쓴 제목"
      contents: "철수가 쓴 내용"
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [나의함수] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수();
    console.log(result);
    alert(result.data.createBoard.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기)요청하기</button>
    </>
  );
}
