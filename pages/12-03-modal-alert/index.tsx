import { Modal } from "antd";

const success = () => {
  Modal.success({
    content: "게시글 등록 성공!",
  });
};

const error = () => {
  Modal.error({
    // title: "This is an error message",
    content: "비밀번호가 틀림!!",
  });
};

export default function App() {
  return (
    <div>
      <button onClick={success}>Success성공!!</button>
      <button onClick={error}>Error실패!!</button>
    </div>
  );
}
