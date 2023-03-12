import { useRouter } from "next/router";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

const HIDDEN_HEADER = [
  "/12-02-library-star",
  "/12-03-modal-alert",
  // ...
  // ...
];

interface ILayoutProps {
  children: JSX.Element;
}

// const qqq= {
//     height: "500px",
//     display: "flex"
// }
// 원래는 따로 선언하는 모양인데 그걸 가져오는 방식이라 괄호가 2개 생기는 모양이다.

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  console.log(router.asPath);

  const isHiddenHeader = HIDDEN_HEADER.includes(router.asPath);
  return (
    <>
      {!isHiddenHeader && <LayoutHeader></LayoutHeader>}
      {/* HIDDEN_HEADER에 없는 페이지만 헤더를 보여준다 */}
      <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation>
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div>
        <div style={{ width: "70%" }}>{props.children}</div>
      </div>
      <LayoutFooter></LayoutFooter>
    </>
  );
}
