import Head from "next/head";
import { useEffect } from "react";

// window에는 기본적으로 kakao가 없기 떄문에 있다는것을 알려줘야한다.
declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  // API를 로딩하는 스크립트 태그는 반드시 실행 코드보다 먼저 선언되어야 하기 떄문에 useEffect를 이용한다.

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.556329, 126.931475), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <>
      {/* JSX 문법이라 HEAD부분이 따로 없다. 불러와주기  */}
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9f7ec2c230c4669c85bacfe30e89b7e3"
        ></script>
      </Head>

      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </>
  );
}
