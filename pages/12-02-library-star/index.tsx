import styled from "@emotion/styled";
import { Rate } from "antd";
import { useState } from "react";

const MyStar = styled(Rate)``;

export default function LibraryIconPage() {
  const [value, setValue] = useState(0);

  return (
    <>
      <MyStar onChange={setValue} />
      {/* 원래 모양은 이건데 생략되거임 */}
      {/* <MyStar onChange={(value)=>setValue(value)} /> */}
      <div>{value}</div>
    </>
  );
}

// 안트디자인에서 불러온 아이콘은 id값을 인식못한다. event.target.id를 못한다는 말! 그렇기 때문에 <span>이나 <div>태그로 감싸서 위에 아이디를 준다.
