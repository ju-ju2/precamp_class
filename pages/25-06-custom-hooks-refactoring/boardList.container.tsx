import { useQuery } from "@apollo/client";
// import { useRouter } from "next/router";
// import { MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import { useMoveToPage } from "../../src/components/commons/hooks/useMoveToPage";
import { useSearch } from "../../src/components/commons/hooks/useSearch";
import BoardListUI from "./boardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./boardList.queries";

export default function BoardList() {
  const { onClickMoveToPage } = useMoveToPage();
  const { keyword, onChangeKeyword } = useSearch();

  // const router = useRouter();
  // const [keyword, setKeyword] = useState("");
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: dataBoardsCount, refetch: dataBoardsRefetch } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  // const onClickWriteBoard = () => {
  //   void router.push("./boards/new");
  // };

  // const onClickListTitle = (event: MouseEvent<HTMLDivElement>) => {
  //   void router.push(`./boards/${event.currentTarget.id}`);
  // };

  // const onChangeKeyword = (value: string) => {
  //   setKeyword(value);
  // };

  return (
    <>
      <BoardListUI
        data={data}
        count={dataBoardsCount?.fetchBoardsCount}
        onClickMoveToPage={onClickMoveToPage}
        // onClickWriteBoard={onClickWriteBoard}
        // onClickListTitle={onClickListTitle}
        refetch={refetch}
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
        dataBoardsRefetch={dataBoardsRefetch}
      />
    </>
  );
}
