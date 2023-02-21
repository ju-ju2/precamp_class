import { Email, EmailInput } from "../../styles/emotion";

export default function EmotionPage() {
  // 여기는 자바스크립트 쓰는곳
  return (
    // 여기는 html
    <div>
      <Email>이메일</Email>
      <EmailInput type="text"></EmailInput>
      <button>클릭하세요</button>
      <img src="/vercel.svg"></img>
    </div>
  );
}
