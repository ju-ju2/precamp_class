// import { BlueButton, RedInput } from "./BoardWrite.styles";
import * as S from "./BoardWrite.styles";
// 하나하나 다 가져오기엔 줄이 너무 길어지니까 다 가져오고 S로 받는다.

export default function BoardWriteUI(props) {
  //  자바스크립트 영역

  //html영역(return아래)
  return (
    <>
      <div>3.부모-자식-손자 메세지</div>
      {/* 작성자: <RedInput type="text" onChange={props.onChangeWriter}></RedInput> */}
      작성자:{" "}
      <S.RedInput type="text" onChange={props.onChangeWriter}></S.RedInput>
      <br />
      제목: <input type="text" onChange={props.onChangeTitle}></input>
      <br />
      내용: <input type="text" onChange={props.onChangeContents}></input>
      <br />
      <S.BlueButton
        rrr="40px"
        ggg="yellow"
        zzz={props.myWidth}
        onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
      >
        {props.isEdit ? "수정하기" : "등록하기"}
      </S.BlueButton>
    </>
  );
}
