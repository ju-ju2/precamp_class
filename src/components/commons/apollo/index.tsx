import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const client = new ApolloClient({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  // prettier-ignore
  // 주석으로 prettier-ignore 해주면 한줄로 바뀌는걸 막아준다
  return <ApolloProvider client={client}>
    {props.children}
    </ApolloProvider>;
}
