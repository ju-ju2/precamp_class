import styled from "@emotion/styled";
import { Modal } from "antd";
import { IBoard } from "../../src/commons/types/generated/types";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Card = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  margin: 10px 0 10px 10px;
  padding: 10px;
`;
const Product = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Writer = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;
const Price = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 50px;
`;

interface IBasketsProps {
  id: number;
  writer: string;
  product: string;
  price: number;
}

const myBasket = [
  { id: 100, writer: "짱구", product: "액션가면 인형", price: 30000 },
  { id: 200, writer: "철수", product: "과외", price: 40000 },
  { id: 300, writer: "훈이", product: "도시락", price: 50000 },
  { id: 400, writer: "맹구", product: "시냇물 돌", price: 2000000 },
];

export default function BasketHomework() {
  const onClickBtn = (basket: IBasketsProps) => () => {
    const baskets: IBasketsProps[] = JSON.parse(
      localStorage.getItem("baskets") || "[]"
    );
    console.log(baskets);

    const alreadyIn = baskets.filter((el) => el.id === basket.id);
    if (alreadyIn.length === 1) {
      Modal.warning({ content: "이미 찜한 상품입니다." });
      return;
    }

    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(basket));
  };
  return (
    <>
      <CardWrapper>
        {myBasket.map((el, index) => (
          <Card key={index}>
            <Product>{el.product}</Product>
            <Writer>{el.writer}</Writer>
            <Price>{el.price}</Price>
            <button onClick={onClickBtn(el)}>장바구니 담기</button>
          </Card>
        ))}
      </CardWrapper>
    </>
  );
}
