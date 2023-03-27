import { Global } from "@emotion/react";
import { AppProps } from "next/app";
// import Head from "next/head";
import { RecoilRoot } from "recoil";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";
// import "antd/dist/antd.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 이 페이지에서 카카오 api를 받아오면 모든 페이지에서 다운받기때문에 매우 비효율적이다. */}
      {/* <Head>
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9f7ec2c230c4669c85bacfe30e89b7e3"
    ></script>
  </Head> */}
      <RecoilRoot>
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        </ApolloSetting>
      </RecoilRoot>
    </>
  );
}
