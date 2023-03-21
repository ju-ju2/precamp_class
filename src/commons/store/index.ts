import { atom } from "recoil";

export const isEditState = atom({
  key: "isEditState", // state들 값의 키에 value가 저장됨
  default: false, // 초기값
});
