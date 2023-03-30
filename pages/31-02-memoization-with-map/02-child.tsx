import { memo } from "react";

function Word(props: any) {
  console.log("자식이 랜더링 됩니다.", props.el);

  return (
    <div>
      <span>{props.el}</span>
    </div>
  );
}

// 부모 컴포넌트가 리랜더링될 때, 자식 컴포넌터가 불필요하게 리랜더링 되지 않도록
// React에서 제공하는 memo에 넣어준다. (HOC 방식)
export default memo(Word);
// export default Word;
