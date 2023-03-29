import { Observable } from "@apollo/client";
import { from } from "zen-observable"; // fromPromise랑 똑같음

export default function ObservableFlatmapPage() {
  const onClickButton = () => {
    // new Promise(()=>{})
    // new Observable(()=>{})

    // prettier-ignore
    // 프로미스로부터 옵저버블로 바꿔줘 // flatMap은 합친다는 소리 // subscribe 는 실행이라고 보면 된다
    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"]) // fromPromise랑 같음
      .flatMap((el: string) => from([`${el}결과에 qqq 적용`, `${el}결과에 zzz 적용`]))
      .subscribe((el) => {console.log(el)});
  };
  return (
    <>
      <button onClick={onClickButton}>클릭</button>
    </>
  );
}
