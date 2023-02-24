export default function BoardWriteUI(props) {
  //  자바스크립트 영역

  //html영역(return아래)
  return (
    <>
      <div>3.부모-자식-손자 메세지</div>
      작성자: <input type="text" onChange={props.onChangeWriter}></input>
      <br />
      제목: <input type="text" onChange={props.onChangeTitle}></input>
      <br />
      내용: <input type="text" onChange={props.onChangeContents}></input>
      <br />
      <button onClick={props.onClickSubmit}>GRAPHQL-API(동기)요청하기</button>
    </>
  );
}
