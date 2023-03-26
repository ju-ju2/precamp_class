import { useState } from "react";

export function useSearch() {
  const [keyword, setKeyword] = useState("");
  // 글로벌 스테이트에 저장된 것이 아니기 때문에 여러페이지에서 공유되는 것이 아니다.
  // 독립적인 훅스

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  return {
    keyword,
    onChangeKeyword,
  };
}
