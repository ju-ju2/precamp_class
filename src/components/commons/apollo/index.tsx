import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
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

  // 3. 프리랜더링 무시 - useEffect
  useEffect(() => {
    console.log("지금은 브라우저다");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    if (result) setAccessToken(result);
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    // cache: new InMemoryCache(),
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  // 주석으로 prettier-ignore 해주면 한줄로 바뀌는걸 막아준다
  return <ApolloProvider client={client}>
    {props.children}
    </ApolloProvider>;
}
