import { AppProps } from "next/app";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";
// import "antd/dist/antd.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloSetting>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloSetting>
  );
}
