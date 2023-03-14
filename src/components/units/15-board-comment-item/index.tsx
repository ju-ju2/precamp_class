import styled from "@emotion/styled";
import { useState } from "react";
import { IBoard } from "../../../commons/types/generated/types";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  width: 20%;
`;

interface IBoardCommentItemProps {
  el: IBoard;
}

export default function BoardCommentItem(props: IBoardCommentItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };
  return (
    <div>
      {isEdit && (
        <Row>
          <Column>{props.el.writer}</Column>
          <Column>{props.el.title}</Column>
          <button onClick={onClickEdit}>
            {/* id가 사라진 이유: 컴포넌트로 분리되면서 한줄한줄이 따로 분리되어 map이 완성된다
            그렇기 때문에 해달 줄이 바로 변경됨 */}
            수정하기
          </button>
        </Row>
      )}
      {!isEdit && (
        <div>
          수정할 내용 : <input type="text" />
          <button>수정완료</button>
        </div>
      )}
    </div>
  );
}
