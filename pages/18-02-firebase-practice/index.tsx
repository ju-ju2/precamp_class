import styled from "@emotion/styled";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  DocumentData,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { ChangeEvent, useState } from "react";
import { firebaseApp } from "../_app";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Column = styled.div`
  width: 20%;
`;

export default function FirebasePractice() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [boardsData, setBoardsData] = useState<DocumentData[]>([]);
  const [boardId, setBoardId] = useState<string[]>([]);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickUpload = async () => {
    const myBoard = collection(getFirestore(firebaseApp), "MyBoard");
    void addDoc(myBoard, {
      writer,
      title,
      contents,
    });
  };

  const onClickShowBoads = async () => {
    const myBoard = collection(getFirestore(firebaseApp), "MyBoard");
    const result = await getDocs(myBoard);
    const data = result.docs.map((el) => el.data());
    setBoardsData(data);
    console.log(data);
    const dataId = result.docs.map((el) => el.id);
    setBoardId(dataId);
    console.log(dataId);
  };

  const onClickUpdate = async () => {
    const myBoardUpdate = doc(
      getFirestore(firebaseApp),
      "MyBoard",
      "Ze8846AOngjCyz1vXSzN"
    );
    await updateDoc(myBoardUpdate, {
      writer: "천재쥬쥬",
    });
  };

  const onClickDelete = async () => {
    const myBoardDelete = doc(
      getFirestore(firebaseApp),
      "MyBoard",
      "Gt4X2WRtowAYT4gt3w3Z" // 삭제할 데이터 id
    );
    await deleteDoc(myBoardDelete);
  };

  return (
    <>
      작성자 : <input onChange={onChangeWriter}></input>
      <br />
      제목 : <input onChange={onChangeTitle}></input>
      <br />
      내용 : <input onChange={onChangeContents}></input>
      <br />
      <button onClick={onClickUpload}>등록하기</button>
      <Wrapper>
        <Row>
          <Column>제목</Column>
          <Column>작성자</Column>
          <Column>내용</Column>
          <Column></Column>
        </Row>
        {boardsData.map((el, index) => (
          <Row key={index}>
            <Column>{el.writer}</Column>
            <Column>{el.title}</Column>
            <Column>{el.contents}</Column>
            <button onClick={onClickUpdate}>수정하기</button>
            <button onClick={onClickDelete}>삭제하기</button>
          </Row>
        ))}
      </Wrapper>
      <button onClick={onClickShowBoads}>게시글보기</button>
      {/* <button onClick={onClickGetAll}></button>
  <button onClick={onClickUpdate}></button>
  <button onClick={onClickDelete}></button> */}
    </>
  );
}
