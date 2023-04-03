import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GraphqlMutationPage, {
  CREATE_BOARD,
} from "../../pages/34-05-jest-unit-test-mocking";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

// 가짜 router.push 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

// 가짜 크리에이트 보드 만들기
const mocks = [
  {
    request: {
      query: CREATE_BOARD,
      variables: {
        createBoardInput: {
          writer: "철수",
          title: "안녕하세요",
          contents: "철수입니다",
          password: "1234",
        },
      },
    },
    result: {
      data: {
        createBoard: {
          _id: "백앤드에서-받은-게시글-아이디",
          writer: "철수",
          title: "안녕하세요",
          contents: "철수입니다",
        },
      },
    },
  },
];

it("API를 모킹하여 테스트 하자!!", async () => {
  render(
    // 실제 뮤테이션에서 아폴로세팅으로 감싸줘야 뮤테이션 쿼리 API가 날라가듯이, MockProvider을 통해 가짜 뮤테이션을 날린다.
    <MockedProvider mocks={mocks}>
      <GraphqlMutationPage />
    </MockedProvider>
  );
  fireEvent.change(screen.getByRole("input-writer"), {
    target: { value: "철수" },
  });
  fireEvent.change(screen.getByRole("input-title"), {
    target: { value: "안녕하세요" },
  });
  fireEvent.change(screen.getByRole("input-contents"), {
    target: { value: "철수입니다" },
  });
  fireEvent.click(screen.getByRole("submit-button"));
  // 클릭을 했으니 페이지가 이동될 것이다 expect(푸쉬결과)
  await waitFor(() => {
    expect(push).toHaveBeenCalledWith("/boards/백앤드에서-받은-게시글-아이디");
  });
});
