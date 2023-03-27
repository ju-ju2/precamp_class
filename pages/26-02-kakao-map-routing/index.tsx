import { useRouter } from "next/router";
import Link from "next/link";

export default function KakaoMapPage() {
  const router = useRouter();
  const onClickMoveToMAp = () => {
    void router.push("/26-03-kakao-map-routed");
  };
  return (
    // <a href="./26-03-kakao-map-routed">맵으로 이동하기</a>
    // <button onClick={onClickMoveToMAp}>맵으로 이동하기</button>
    <Link href="./26-03-kakao-map-routed">
      <a>맵으로 이동하기</a>
    </Link>
  );
}

// SPA(Single Page Application) 과 MPA(Multi Page Application)의 이해

// SPA 는 페이지가 이미 랜더링 되어있기 때문에 페이지 전환이 매우 빠르다.
// 리액트, 뷰 등에서 쓰이는 방식
// CSR (Client Side Rendering)
// 라우터 사용

// MPA 는 페이지 전환을 할 때 마다 페이지를 새로고침해서 전환이 느리다.
// 옛날 php 방식
// SSR (Server Side Rendering)
// <a> 앵커태그 사용

// next에서 제공하는 Link 태그를 이용하여 <a>와 같이 작동되지만 CSR 방식을 사용할 수 있다

// Link 태그를 쓰는 경우
// 1. 버튼 클릭으로 이동하는게 아닌경우(버튼이 눌러지고 데이터 통신하는 함수가 실행되어야 할 때)
// 2. 추가 로직을 실행시키고 싶은 경우, 기능이 추가될때 (global State에 저장)
