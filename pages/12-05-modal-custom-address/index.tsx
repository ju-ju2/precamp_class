import { useState } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

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

  const handleComplete = (address: Address) => {
    //  마우스 위에 올려보면 매개변수가 뭐가 들어가는지 , 그 타입은 무엇인지 나온다.
    console.log(address);
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>모달 열기</button>

      {/* 모달 종료방식 : 1. 모달 숨기는 법 ex: 이력서 */}
      {/* <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal> */}

      {/* 모달 종료방식 : 2. 모달 삭제하는 법 ex: 신용카드 정보 */}
      {/* 조건부 렌더링 : isModalOpen이 true면 항상 open=(true) */}

      {isModalOpen && (
        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
