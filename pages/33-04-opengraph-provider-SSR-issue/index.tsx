// 제공자일때 => 네이버(제공자)
import { gql, useQuery } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";

const FETCH_USED_ITEM = gql`
  query typeSetting($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;
export default function OpengraphProviderPage(props: any) {
  // const { data } = useQuery(FETCH_USED_ITEM, {
  //   variables: {
  //     useditemId: "642988ddaef9f000281b802d",
  //   },
  // });
  // 기존방법으로는 초기에 그린 html 메타부분 content 가 비어져있다. 스크립트를 읽으면서 useQuery를 처리하고 content부분을 채우게 되는것
  // => 그렇기 때문에 브라우저 외, 포스트맨이나 axios 같은 것은 빈 태그만 가져오게됨 => 썸네일 못만듬
  // SSR 렌더링 이용 : html부분을 그리기 전에 우선 데이터를 받고 그 후에 완벽한 html을 보낸다.

  return (
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0]} />
      </Head>
      <div>
        여기는 프리보드 화면(여기는 바디 부분이므로 메타태드, 미리보기와
        상관없음)
      </div>
    </>
  );
}

// 모든 페이지가 아니라 해당 페이지만 SSR 서버사이드랜링이 된것임
// 해당 함수의 이름은 서버에서 읽는 것이기 때문에 내마음대로 이름을 바꿀 수 없음
// 여기는 서버에서만 실팽됨(webpack 프론트앤드 서버 프로그램)
export const getServerSideProps = async () => {
  console.log("여기는 서버입니다");
  // 1. API 요청
  const graphqlClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql"
  );
  const result = await graphqlClient.request(FETCH_USED_ITEM, {
    useditemId: "642988ddaef9f000281b802d",
  });

  // 2. 받아온 결과를 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};
