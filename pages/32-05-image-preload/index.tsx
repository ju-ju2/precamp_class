// 32-06의 이미지를 미리 받아놓기

import { useRouter } from "next/router";
import { useEffect } from "react";

// 태그가 저장되어야 다음 페이지로 넘어가도 이미지를 다시 다운받지 않는다.
// 변수가 변경되어도 리랜더링 되지 않도록 전역변수로 저장
// 프리로드 해야 될 이미지들
const PRELOAD_IMAGES = [
  "https://images.unsplash.com/photo-1679419930974-e8171969aea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
];

// 프리로드가 된 이미지들
const PRELOADED_IMAGES = [];

export default function ImagePreloadPage() {
  const router = useRouter();
  const onClickMove = () => {
    void router.push("/32-06-image-preload-moved");
  };

  useEffect(() => {
    const preLoadImage = () => {
      PRELOAD_IMAGES.forEach((el) => {
        // 이미지 태그를 만든다.
        const img = new Image();
        img.src = el;
        img.onload = () => {
          PRELOADED_IMAGES.push(img);
        };
      });
    };
    preLoadImage();
  }, []);
  return (
    <>
      <button onClick={onClickMove}>이미지 이동하기</button>
    </>
  );
}
