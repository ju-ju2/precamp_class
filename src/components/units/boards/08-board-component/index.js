export default function BoardComponent(props) {
  return (
    <>
      <h1>{props.qqq}페이지</h1>
      제목: <input type="text"></input>
      <br />
      내용: <input type="text"></input>
      <br />
      <button>{props.qqq}하기</button>
    </>
  );
}
