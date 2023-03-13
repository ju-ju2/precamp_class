import { MouseEvent, useState } from "react";

export default function BoardNumber(props: any) {
  const [startPage, setStartPage] = useState(1);

  const lastPage = props.dataBoardsCount
    ? Math.ceil(props.dataBoardsCount.fetchBoardsCount / 10)
    : 0;

  const onClickPage = async (event: MouseEvent<HTMLSpanElement>) => {
    await props.refetch({ page: Number(event.currentTarget.id) });
    // void써도 상관없다. 아래 로직에 이패치 받은걸로 어떤걸 하면 무조건 await를 써줘야함
    // currentTarget: 현재 클릭한 현재 타겟 vs eventTarget: 이미지, 파일 등 여러곳에 들어가기 때문에 태그가 아닐수도있어서 무조건 아이디가 있음을 보장할 수 없다.
  };

  const onClickPrevPage = async () => {
    if (startPage === 1) return;
    // 마이너스 페이지로 가지않도록
    setStartPage((prev) => prev - 10);
    await props.refetch({ page: startPage - 10 });
  };
  const onClickNextPage = async () => {
    // if (startPage + 10 <= 마지막 페이지)
    if (startPage + 10 <= lastPage) {
      setStartPage((prev) => prev + 10);
      // 기존 값에 10을 더하는 로직
      // setStartPage(startPage + 10) 해도 된다.
      await props.refetch({ page: startPage + 10 });
    }
  };
  return (
    <>
      <span onClick={onClickPrevPage}>이전페이지</span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= lastPage && (
            <span
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              style={{ margin: "10px" }}
            >
              {index + startPage}
            </span>
          )
      )}
      <span onClick={onClickNextPage}>다음페이지</span>
    </>
  );
}
