import { GetDate } from "../../../../commons/utils/utils";
import PageNation01 from "../../../commons/pagenation/01/pagenation01.container";
import * as S from "./BoardList.styles";
import { IBoardListUIProps } from "./boardList.types";
import { v4 as uuidv4 } from "uuid";
import SearchBar01 from "../../../../commons/searchBar/01/searchBar01.container";

export default function BoardListUI(props: IBoardListUIProps) {
  console.log(props.count);
  return (
    <>
      <S.ListWrapper>
        <S.Title>베스트 게시물</S.Title>
        <S.CardListWrapper>
          <S.CardWrapper></S.CardWrapper>
          <S.CardWrapper></S.CardWrapper>
          <S.CardWrapper></S.CardWrapper>
          <S.CardWrapper></S.CardWrapper>
        </S.CardListWrapper>
        <S.SearchWrapper>
          {/* <S.SearchTitle>
            <S.IconSearch src="../../img/icon-search.png"></S.IconSearch>
            <S.SearchTitleInput
              onChange={props.onChangeSearch}
              placeholder="제목을 검색해주세요"
            ></S.SearchTitleInput>
          </S.SearchTitle> */}
          <SearchBar01
            refetch={props.refetch}
            onChangeKeyword={props.onChangeKeyword}
            dataBoardsRefetch={props.dataBoardsRefetch}
          />
          <S.SearchYear></S.SearchYear>
          <S.SearchButton>검색하기</S.SearchButton>
        </S.SearchWrapper>
        <S.BoardListWrapper>
          <S.ListRow>
            <S.ListColumnBasic>번호</S.ListColumnBasic>
            <S.ListColumnBasicTitle>제목</S.ListColumnBasicTitle>
            <S.ListColumnBasic>작성자</S.ListColumnBasic>
            <S.ListColumnBasic>날짜</S.ListColumnBasic>
          </S.ListRow>
          {props.data?.fetchBoards.map((el, index) => (
            <S.ListRow key={el._id}>
              <S.ColumnBasic>
                {/* {String(el._id).slice(-4).toUpperCase()} */}
                {index + 1}
              </S.ColumnBasic>
              <S.ColumnTitle
                id={el._id}
                onClick={props.onClickMoveToPage(`/boards/${el._id}`)}
              >
                {el.title
                  .replaceAll(props.keyword, `!@9#$${props.keyword}!@9#$`)
                  .split("!@9#$")
                  .map((el) => (
                    <span
                      key={uuidv4()}
                      style={{
                        color: el === props.keyword ? "orange" : "black",
                      }}
                    >
                      {el}
                    </span>
                  ))}
              </S.ColumnTitle>
              <S.ColumnBasic>{el.writer}</S.ColumnBasic>
              <S.ColumnBasic>{GetDate(el.createdAt)}</S.ColumnBasic>
            </S.ListRow>
          ))}
        </S.BoardListWrapper>
        <S.FooterWrapper>
          <PageNation01 count={props.count} refetch={props.refetch} />
          <S.UploadButton onClick={props.onClickMoveToPage("/boards/new")}>
            <S.IconWrite src="../../img/icon-write.png"></S.IconWrite>
            게시물 등록하기
          </S.UploadButton>
        </S.FooterWrapper>
      </S.ListWrapper>
      ;
    </>
  );
}
