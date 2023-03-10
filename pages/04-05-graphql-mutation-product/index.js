// args 는 arguments로 인자가 들어가는 것을 뜻한다
// 아래의 값들이 지정하는 것이 아닌 인풋창에 입역되는 값으로 들어가는 것

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_PRODUCT = gql`
  mutation typeSetting(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");

  const [나의함수] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables가 $역할을 해주기때문에 한번 더 쓸 필요 없다
        seller: seller, // $writer 랑 state 변수 writer랑 같아도 상관없다, 아예 다른 놈임
        createProductInput: {
          name: name,
          detail: detail,
          price: price,
        },
      },
    });
    console.log(result);
    alert(result.data.createProduct.message);
  };

  const onChangeSeller = (event) => {
    setSeller(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeDetail = (event) => {
    setDetail(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(Number(event.target.value)); //넘버링 해주기
  };

  return (
    <>
      작성자: <input type="text" onChange={onChangeSeller}></input>
      <br />
      제품이름: <input type="text" onChange={onChangeName}></input>
      <br />
      세부사항: <input type="text" onChange={onChangeDetail}></input>
      <br />
      가격: <input type="text" onChange={onChangePrice}></input>
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기)요청하기</button>
    </>
  );
}
