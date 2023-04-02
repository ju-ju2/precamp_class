// 개발자일때 썸네일 꾸미기

import axios from "axios";

export default function OpengraphDeveloperPage() {
  const onClickEnter = async () => {
    // 1. 채팅데이터에 주소가 있는지 찾기 (ex, https:// 로 시작하는 것)

    // 2. 해당 주소로 스크래핑하기
    const result = await axios.get("https://www.gmarket.co.kr"); //  CORS: 네이버
    // 현재 지마켓에서도 코스 문제로 막힘 => 백엔드에서 해야하는 일
    console.log(result.data);

    // 3. 매타태그에서 (오픈그래프)og태그 찾기
    // 아래 방법 외에도 스크래핑(cheerio) 크롤링(puppeteer) 라이브러리로 쉽게 가져올 수 있음
    console.log(
      result.data.split("<meta").filter((el: string) => el.includes("og:"))
    );
  };
  return (
    <>
      <button onClick={onClickEnter}>채팅 입력 후 엔터치기</button>
    </>
  );
}
