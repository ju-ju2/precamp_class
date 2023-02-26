export default function BoardComponent(props) {
  return (
    <>
      <h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
      {/* 유지보수가 더 쉽게 true/false로 로직을 구성한다. */}
      제목: <input type="text"></input>
      <br />
      내용: <input type="text"></input>
      <br />
      <button>{props.isEdit ? "수정" : "등록"}하기</button>
    </>
  );
}
