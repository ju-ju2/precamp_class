import { useAuth } from "../../src/components/commons/hooks/useAuth";

export default function CustomHooksUseAuthPage() {
  useAuth();
  // 다른 것들 시작하기 전에 먼저 실행시켜버린다.

  // *****커스텀 훅을 만들때에는 룰이 있다******
  // 함수랑 똑같은 것이지만 만드는 커스텀 훅 안에 use로 시작하는 함수가 있다면 이름에 use를 붙여주는것이 관례
  // use함수들은 다른 함수들과 패턴이 다르기 때문에(리랜더링, 한번만 작동 등) docs에서 이름을 다르게 use를 붙이는 것을 권장.
  return <div>프로필 페이지 입니다</div>;
}
