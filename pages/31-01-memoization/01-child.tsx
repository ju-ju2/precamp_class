import { memo } from "react";

function MemoizationChildPage() {
  console.log("자식이 랜더링 됩니다.");

  return (
    <>
      <div>---------------------</div>
      <h1>저는 자식 컴포넌트 입니다.</h1>
      <div>---------------------</div>
    </>
  );
}

// 부모 컴포넌트가 리랜더링될 때, 자식 컴포넌터가 불필요하게 리랜더링 되지 않도록
// React에서 제공하는 memo에 넣어준다. (HOC 방식)
export default memo(MemoizationChildPage);
