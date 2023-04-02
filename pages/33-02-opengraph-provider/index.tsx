// 제공자일때 => 네이버(제공자)
import Head from "next/head";

export default function OpengraphProviderPage() {
  return (
    <>
      <Head>
        <meta property="og:title" content="프리보드" />
        <meta
          property="og:description"
          content="나의 게시판에 온 것을 환영합니다"
        />
        <meta property="og:image" content="https://~~" />
      </Head>
      <div>
        여기는 프리보드 화면(여기는 바디 부분이므로 메타태드, 미리보기와
        상관없음)
      </div>
    </>
  );
}
