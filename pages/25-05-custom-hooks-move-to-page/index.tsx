import { useMoveToPage } from "../../src/components/commons/hooks/useMoveToPage";

export default function customHooksUseMoveToPage() {
  const { onClickMoveToPage } = useMoveToPage();
  // 함수를 실행시키고 리턴 결과(객체)값의 키를 가져온다.

  return (
    <>
      <button onClick={onClickMoveToPage("/boards")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/market")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/myPage")}>마이페이지로 이동</button>
    </>
  );
}
