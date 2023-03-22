import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

const GLOBAL_STATE = new InMemoryCache();
// 페이지 전환(_app.tsx 리랜더)이 있더라도 기존에 있던 캐시는 이곳에 저장되기 때문에 캐시가 초기화 되지 않는다.

interface IApolloSettingProps {
  children: JSX.Element;
}

const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

export default function ApolloSetting(props: IApolloSettingProps) {
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
