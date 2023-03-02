import { useState } from "react";
import { Modal } from "antd";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>모달 열기</button>
      <Modal
        title="모달제목"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        비밀번호 입력 <input type="password"></input>
      </Modal>
    </>
  );
}
