import { gql, useApolloClient } from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;
export default function LoginSuccessPage() {
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const client = useApolloClient();
  const onClickButton = async () => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
    console.log(result);
  };
  return (
    <>
      <button onClick={onClickButton}>클릭하세요</button>
      <div>님 환영합니다!</div>
    </>
  );
}

// 데이터 조회 방식
// 1. 페이지 접속하면 자동으로 data에 받아지고, 리랜더링
// const { data } = useQuery()
// 2. 버튼 클릭 시, 직접 실행하면 data에 받아지고, 리랜더림
// const { myQuery, {data} } = useLazyQuery()
// 3. axios와 동일
// const client = useApolloClient()
