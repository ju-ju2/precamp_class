export default function CounterStatePage() {
  function onClickCountUp() {
    const count = Number(document.getElementById("count").innerText);
    // id에 담긴애는 숫자가 아니라 문자열 0이라 숫자로 바꾸는 과정이 필요함
    document.getElementById("count").innerText = count + 1;
  }

  function onClickCountDown() {
    const count = Number(document.getElementById("count").innerText);
    document.getElementById("count").innerText = count - 1;
  }

  return (
    <div>
      <div id="count">0</div>
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
      <button onClick={onClickCountDown}>카운트 내리기!!</button>
    </div>
    /* div적기싫으면 그냥 <> 이렇게 감싸면 됨 ,fragment */
  );
}
