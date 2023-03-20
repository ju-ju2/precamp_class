import ChildPage from "./02-child";

export default function ParentPage() {
  return (
    // childPage라는 함수에 객체를 인자로 보내주는 거랑 똑같음
    // 1. 컴포넌트는 그냥 함수에 불과하다
    // 따라서 props도 매개변수에 불과. 즉, 내 마음대로 이름변경 가능
    <div>
      {/* <ChildPage count={3} /> */}
      {ChildPage({ count: 3 })}
    </div>
  );
}
