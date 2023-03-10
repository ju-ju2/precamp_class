// args 는 arguments로 인자가 들어가는 것을 뜻한다
// 아래의 값들이 지정하는 것이 아닌 인풋창에 입역되는 값으로 들어가는 것

import { gql, useMutation } from "@apollo/client";

// $는 변수라는 말
// const CREATE_BOARD = gql`
//   mutation createBoard($writer: String, $title: String, $contents: String) { //변수의 타입 적는 란
//     createBoard(
//       writer: $writer                  //실제 우리가 전달할 변수
//       title: $title
//       contents: $contents
//     ) {
//       _id
//       number
//       message
//     }
//   }
// `

const CREATE_BOARD = gql`
  mutation typeSetting($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [나의함수] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables가 $역할을 해주기때문에 한번 더 쓸 필요 없다
        writer: "훈이",
        title: "안녕 나는 훈이",
        contents: "훈이 글입니다",
      },
    });
    console.log(result);
    alert(result.data.createBoard.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기)요청하기</button>
    </>
  );
}
