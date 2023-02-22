// axios는 기본적으로 비동기로 작동하는데 api통신을 하기 위해선 통신이 다 될때까지 기다려야한다. 동기적 처리가 가능해야한다는 말
// 그렇기 때문데 await라는 (기다려) 명령어를 쓰고 이것은 async(비동기)와 붙어다닌다

import axios from "axios";
import { useState } from "react";

export default function RestGetPage() {
  const [title, setTitle] = useState("");

  const onClickAsync = () => {
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log(result);
  };

  async function onClickSync() {
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data);
    console.log(result.data.title);
    setTitle(result.data.title);
  }

  // const onClickSync = async () => {}
  //화살표 함수로 표현할때는 function 앞인 ()앞에 붙여야한다

  return (
    <>
      <div>{title}</div>
      <button onClick={onClickAsync}>REST-API(비동기) 요청하기</button>
      <button onClick={onClickSync}>REST-API(동기) 요청하기</button>
    </>
  );
}
