import { useRouter } from "next/router";

export default function StaticRoutingPage() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/05-08-dynamic-routed-board-query/326");
    // router.push : 페이지를 이동할꺼에요
    // /1 의 값은   [qqq]로 넘어간다
  };
  const onClickMove2 = () => {
    router.push("/05-08-dynamic-routed-board-query/400");
  };
  const onClickMove3 = () => {
    router.push("/05-08-dynamic-routed-board-query/526");
  };
  const onClickMove100 = () => {
    router.push("/05-08-dynamic-routed-board-query/500");
  };

  return (
    <>
      <button onClick={onClickMove1}>326번 게시글로 이동하기</button>
      <br />
      <button onClick={onClickMove2}>400번 게시글로 이동하기</button>
      <br />
      <button onClick={onClickMove3}>526번 게시글로 이동하기</button>
      <br />
      <button onClick={onClickMove100}>500번 게시글로 이동하기</button>
      <br />
    </>
  );
}
