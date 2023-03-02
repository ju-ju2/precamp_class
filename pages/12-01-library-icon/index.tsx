import { RightOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const MyIcon = styled(RightOutlined)`
  color: red;
  font-size: 50px;
  //   이미지가 아니라 폰트로 인식한다
`;

export default function LibraryIconPage() {
  return (
    <>
      <RightOutlined />
      {/* 위가 안트디자인에서 불러오기 */}
      <MyIcon />
      {/* 이모션이랑 결합해서 쓰기 */}
    </>
  );
}

// 안트디자인에서 불러온 아이콘은 id값을 인식못한다. event.target.id를 못한다는 말! 그렇기 때문에 <span>이나 <div>태그로 감싸서 위에 아이디를 준다.
