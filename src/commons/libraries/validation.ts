export const checkValidationFile = (file?: File) => {
  if (!file?.size) {
    alert("파일이 없습니다");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    // 1B * 1024 = 1KB  / 1024 * 1024 = 1MB
    alert("파일용량이 너무 큽니다. 제한 용량은 5MB입니다");
    return false;
  }

  if (
    !file.type.includes("jpeg") &&
    !file.type.includes("jpg") &&
    !file.type.includes("png")
  ) {
    alert("파일 확장자를 확인해주세요! jpeg, png 확장자만 가능");
    return false;
  }
  return true;
};

// 불러나갈 함수(checkValidationFile)를 종료하는것인지 부른 함수를 종료하는 것인지 알수없기 때문에 true/false를 보내준다
