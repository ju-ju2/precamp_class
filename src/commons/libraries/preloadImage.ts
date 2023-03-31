// 프리로드가 된 이미지들
export const PRELOADED_IMAGES: HTMLImageElement[] = [];
// 포인트 : 변수가 초기화 되면 안된다.
// 리랜더링되면 다시 다운받아하기 때문에 전역변수로 설정해줌

export const preLoadImage = (images: string[]) => {
  images.forEach((el) => {
    // 이미지 태그를 만든다.
    const img = new Image();
    img.src = el;
    img.onload = () => {
      PRELOADED_IMAGES.push(img);
    };
  });
};
