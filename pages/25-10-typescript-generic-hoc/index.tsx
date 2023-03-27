import { Modal } from "antd";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

// prettier-ignore
export const withAuth = (Component: ComponentType) => <P extends {}>(props: P) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      Modal.info({ content: "로그인 후 이용 가능한 페이지입니다." });
      void router.push("./23-03-login-check");
    }
  }, []);

  return <Component {...props}/>;
};
