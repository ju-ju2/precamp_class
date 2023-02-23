import { useRouter } from "next/router";

export default function StaticRoutingPage() {
  const router = useRouter();

  const onClickMove = () => {
    router.push("/05-02-static-routed");
    //router.push : 페이지를 이동할꺼에요
  };

  return (
    <>
      <button onClick={onClickMove}>페이지 이동하기</button>
    </>
  );
}
