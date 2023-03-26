import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../../commons/store";

export function useMoveToPage() {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);
  const onClickMoveToPage = (path: string) => () => {
    setVisitedPage(path);
    void router.push(path);
  };

  return {
    visitedPage, // 로그인 후 그 전 페이지로 돌아가기 같은 로직을 쓸때 사용 가능
    onClickMoveToPage,
  };
}
