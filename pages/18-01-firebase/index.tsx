import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseApp } from "../_app";

export default function FirebasePage() {
  const onClickSubmit = async () => {
    const board = collection(getFirestore(firebaseApp), "Board");
    void addDoc(board, {
      writer: "짱구",
      title: "제목입니다",
      contents: "짱구내용입니다",
    });
  };
  const onClickFetch = async () => {
    const board = collection(getFirestore(firebaseApp), "Board");
    const result = await getDocs(board);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };
  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
