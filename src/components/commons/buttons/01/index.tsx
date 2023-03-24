interface IButton01Props {
  isActive: boolean;
  title: string;
}

export default function Button01(props: IButton01Props) {
  console.log(props.isActive);
  return (
    <button style={{ backgroundColor: props.isActive ? "yellow" : "" }}>
      {props.title}
    </button>
  );
}
