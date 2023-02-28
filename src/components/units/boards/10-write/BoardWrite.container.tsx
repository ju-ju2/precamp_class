import BoardWriteUI from "./boardWrite.presenter";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";

interface IProps {
  isEdit: boolean;
  data?: any;
}

export default function BoardWrite(props: IProps) {
  //자바스크립트 영역

  const router = useRouter();
  console.log(router);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [myWidth, setMyWidth] = useState(false);

  const [나의함수] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  //등록하기 뮤테이션 -> 등록된 상세페이지
  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        //variables가 $역할을 해주기때문에 한번 더 쓸 필요 없다
        writer: writer, //$writer 랑 state 변수 writer랑 같아도 상관없다, 아예 다른 놈임
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    alert(result.data.createBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`);
  };

  //수정하기 뮤테이션 -> 수정된 상세페이지
  const onClickUpdate = async () => {
    interface IMyVariables {
      number: number;
      writer?: string;
      title?: string;
      contents?: string;
    }

    const myVariables: IMyVariables = {
      number: Number(router.query.number),
    };
    if (writer) myVariables.writer = writer;
    if (title) myVariables.title = title;
    if (contents) myVariables.contents = contents;
    //수정되지 않는 값들을 굳이 뮤테이션 날리지 않기 위해
    //초기값 ""을 보내지 않고 수정된 값만 보낼것이다.

    console.log(router.query.number);
    const result = await updateBoard({
      // variables: {
      //   number: Number(router.query.number),
      //   writer,
      //   title,
      //   contents,
      // },
      variables: myVariables,
    });
    alert(result.data.updateBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`);
    // router.push(`08-05-boards/${Number(router.query.number)}`);
  };

  // interface IEvent {
  //   target : {
  //     value: ".."
  //   }
  // }

  //onChange에서 발생하는 타입지정을 리액트 개발자가 이미 만들어줬기때문에 우리가 사용하면된다.
  //하지만 div태그인지, img태그인지, 어떤태그인지에 따라 다 다르기 때문에 <필요한타입>을 추가 지정해준다
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value && title && contents) {
      setMyWidth(true);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setMyWidth(true);
    }
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
    if (writer && title && event.target.value) {
      setMyWidth(true);
    }
  };

  //html영역(return아래)
  return (
    <>
      <div>2.부모-자식 메세지</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        myWidth={myWidth}
        isEdit={props.isEdit}
        data={props.data}
      />
    </>
  );
}
