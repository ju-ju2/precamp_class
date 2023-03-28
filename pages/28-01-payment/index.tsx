import Head from "next/head";
declare const window: typeof globalThis & {
  IMP: any;
};
export default function PaymentPage() {
  const onClickPayment = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp75871841"); // 예: imp00000000a
    IMP.request_pay(
      {
        pg: "nice",
        pay_method: "card", // card, vbank(무통장 입금) 등
        // merchant_uid: "ORD20180131-0000011",   // 주문번호 중복될시 결제안됨, 설정안하면 그냥 랜덤으로 줌
        name: "쥬쥬네 의자",
        amount: 100, // 숫자 타입
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일에는 결제시, 결제 페이지로 사이트가 이동됨
      },
      function (rsp: any) {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);

          // 백엔드에 결제관련 데이터 넘겨주기, => 뮤테이션 실행하기
        } else {
          // 결제 실패 시 로직
          alert("결제 실패");
        }
      }
    );
  };
  return (
    <>
      <Head>
        {/* <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script> */}
        <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      </Head>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}
