import Head from "next/head";
import { useEffect } from "react";

// window에는 기본적으로 kakao가 없기 떄문에 있다는것을 알려줘야한다.
declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  // API를 로딩하는 스크립트 태그는 반드시 실행 코드보다 먼저 선언되어야 하기 떄문에 useEffect를 이용한다.

  useEffect(() => {
    const script = document.createElement("script"); // <script></script>
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9f7ec2c230c4669c85bacfe30e89b7e3";
    document.head.appendChild(script);
    // 쿼리스트링 : 주소에 key와 value값이 여러개 있을때 사이에 & 를 넣으면 & 기준으로 분리되서 요청된다.

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.556329, 126.931475), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      });
    };
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

// 로직 설명
// 1. 스크립트 태그를 만든다.
// 2. 스크립트 태그의 소스부분에 주소를 입력한다.
// 3. head 태그의 작식으로 스트립트를 넣어준다.
// 4. 스크립트를 실행시킨다.
