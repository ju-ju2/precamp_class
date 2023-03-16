import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";
// import "antd/dist/antd.css";

// /////////////////////파이어베이스///////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf3Wb0S1DT-IzE59NeS_rHmE4Yf9Rl9eo",
  authDomain: "freeboard-for-juju.firebaseapp.com",
  projectId: "freeboard-for-juju",
  storageBucket: "freeboard-for-juju.appspot.com",
  messagingSenderId: "193838962713",
  appId: "1:193838962713:web:8f17a8b3598643f80f7288",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// /////////////////////파이어베이스///////////////////////////////////

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloSetting>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </ApolloSetting>
  );
}
