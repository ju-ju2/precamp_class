import { render } from "@testing-library/react";
import JestUnitTestPage from "../../pages/34-03-jest-unit-test-snapshot";

// 스냅샷 테스트는 틀린것을 찾는게 아니라 바뀐것을 찾는 것이다.
// 업데이트 하고 싶다면 test:watch 에서 u(update)
it("기존 사진이랑 바뀐게 없는지 비교해보자!! - 스냅샷 테스트", () => {
  const result = render(<JestUnitTestPage />);
  expect(result.container).toMatchSnapshot();
});
