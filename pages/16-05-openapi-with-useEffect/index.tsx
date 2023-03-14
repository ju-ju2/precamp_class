import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenApiWithUseEffectPage() {
  // 1. 잘못된 예
  // setBox의 상태가 변경되면서 리랜더링되어 result가 값을 계속 받아오는 무한루프가 생긴다.

  // const [box, setBox] = useState("")

  // const result = await axios.get("https://koreanjson.com/posts/1")
  // setBox(result)

  // 2. 올바른 예
  const [dogUrl, setDogUrl] = useState("");

  useEffect(() => {
    const fetchDog = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDogUrl(result.data.message);
    };
    void fetchDog();
    console.log("실행될때 실행");
  }, []);

  return (
    <>
      <img src={dogUrl}></img>
    </>
  );
}
