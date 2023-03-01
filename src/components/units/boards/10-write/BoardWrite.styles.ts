import styled from "@emotion/styled";
import { IBlueButtonProps } from "./BoardWrite.types";

export const RedInput = styled.input`
  border-color: red;
`;

export const BlueButton = styled.button`
  // background-color: blue;
  background-color: ${(props: IBlueButtonProps) => props.ggg};
  font-size: ${(props: IBlueButtonProps) => {
    return props.rrr;
  }};
  width: ${(props: IBlueButtonProps) => (props.zzz ? "300px" : "default")};
`;

//1. props를 받기위해 인위적으로 함수를 생성해준다 : ${()=>{}}
//2. ${(props)=>{return props.OOO}} 으로 값을 리턴한다
//3. ()=>{} 함수에서 {return ~~} 괄호와 리턴사이에 아무것도 없을때 ()로 생략가능하다
//3-1 예: ${(props)=>(props.OOO)}
//4. 소괄호 조차 의미없으면 소관호도 생략이 가능하다.
//4-1 예: ${props => props.OOO}
