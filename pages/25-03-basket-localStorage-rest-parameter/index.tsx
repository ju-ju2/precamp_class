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

type IBaskets = Array<Pick<IBoard, "contents" | "title" | "_id" | "writer">>;

export default function StaticRoutedPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  console.log(data);

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
    console.log(basket); // _typename이 들어가 있는데 빼고 싶다.
    const [__typename, ...rest] = basket; // rest이름 빠꿔도 됨
    console.log(rest);

    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  return (
    <>
      <div>ㅎ하하</div>
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