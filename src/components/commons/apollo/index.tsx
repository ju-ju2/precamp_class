import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
import { accessTokenState } from "../../../commons/store";

const GLOBAL_STATE = new InMemoryCache();
// 페이지 전환(_app.tsx 리랜더)이 있더라도 기존에 있던 캐시는 이곳에 저장되기 때문에 캐시가 초기화 되지 않는다.

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // 1. 프리렌더링(next.js에서는 브라우저에서 랜더링 되기 전에 프론트엔드 서버에서 한번 먼저 랜더링) 예제= process.browser방법
  if (process.browser) {
    // console.log("지금은 브라우저다");
    // window.alert("안녕");
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // if (result) setAccessToken(result);
  } else {
    // console.log("지금은 프론트엔드 서버다");
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // if (result) setAccessToken(result);
  }

  // 2. 프리랜더링 예제 - typeof window 방법
  if (typeof window !== "undefined") {
    // console.log("지금은 브라우저다");
  } else {
    // console.log("지금은 프론트엔드 서버다");
  }

  // 3. 프리랜더링 무시 - useEffect // 새로고침할 때 문제 해결
  useEffect(() => {
    // 1. 기본방식 (refreshToken 이전)
    // console.log("지금은 브라우저다");
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // if (result) setAccessToken(result);

    // 2. 새로운방식 (refreshToken 이후)
    void getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  // 에러를 캐치하고 캐치한 에러가 토큰만료면 재발급 받은 후, 기존의 쿼리를 포워드해서 다시 날려준다.
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러를 캐치
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2-1. refreshToken으로 accessToken을 재발급
            // (아폴로 세팅중이라 gql, 뮤테이션 등을 이 펭지에선 못한다. 하지만 graphql도 rest-api이기 때문에 불러올수있다. 절차가 복잡해서 graphql-request 라이브러리를 다운받는다.)
            // 리프레시 토큰을 쿠키에 담아올것인데, 보안이 강화된 https에 밖에 못가서 옵션을 추가해야 한다.
            getAccessToken().then((newAccessToken) => {
              // 2-2. 재발급 받은 accessToken 저장하기
              setAccessToken(newAccessToken);

              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하기
              if (typeof newAccessToken !== "string") return;
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken}`, // 토큰만 새것으로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-2. 방금 수정한 쿼리 재요청하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql", // https 로 변경(토큰 정보를 쿠키에 담을 수 있게)
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include", // https 변경으로 추가된 조건
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    // cache: new InMemoryCache(),
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  // 주석으로 prettier-ignore 해주면 한줄로 바뀌는걸 막아준다
  return <ApolloProvider client={client}>
    {props.children}
    </ApolloProvider>;
}
