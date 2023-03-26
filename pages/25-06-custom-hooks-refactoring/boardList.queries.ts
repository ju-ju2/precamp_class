import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query typesetting($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      createdAt
    }
  }
`;
export const FETCH_BOARDS_COUNT = gql`
  query typesetting($search: String) {
    fetchBoardsCount(search: $search)
  }
`;
