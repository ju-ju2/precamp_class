interface IProps {
  school: string;
  children: JSX.Element;
}

export default function Layout(props: IProps) {
  return (
    <>
      <div>안녕하세요 짱구입니다</div>
      <div>{props.school}</div>
      <div>{props.children}</div>
      {/* children 페이지만 무엇인지에 따라 바뀐다 */}
      <div>안녕하세요 훈이입니다</div>
    </>
  );
}
