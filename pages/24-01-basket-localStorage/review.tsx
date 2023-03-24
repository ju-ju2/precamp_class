import { useQuery, gql } from "@apollo/client";
import {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;
// type 과 interface의 차이
// 타입은 똑같은 이름으로 못만든다
// 인터페이스는 선언/병합이 가능하다

type IBaskets = Array<Pick<IBoard, "contents" | "title" | "_id" | "writer">>;
// interface IBaskets {
//     basket: Array<Pick<IBoard, "contents" | "title" | "_id" | "writer">>
// }
// Array 배열 형태, Pick 고를것이다, IBoard 타입에서 아래 4개를

// 타입이 길면 본질을 이해하는데 방해하기 때문에 따로 빼서 유지보수를 용이하게 한다.

export default function StaticRoutedPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const onClickBasket = (basket: IBoard) => () => {
    console.log(basket);

    // 1. 기존 장바구니 가져오기
    const baskets: IBaskets = JSON.parse(
      localStorage.getItem("baskets") ?? "[]"
    );

    // 2. 이미 담겼는지 확인하기
    const temp = baskets.filter((el) => el._id === basket._id); // 이미 담긴 id === 클릭한 id
    if (temp.length === 1) {
      alert("이미 담으신 물품입니다!!!");
      return;
    }

    // 3. 해당 장바구니에 담기
    // const baskets = [] // 처음에는 빈 배열이다. 배열인 이유는 클릭을 여러번 할 수 있기 때문이다
    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <button onClick={onClickBasket(el)}>장바구니담기</button>
        </div>
      ))}
    </>
  );
}
