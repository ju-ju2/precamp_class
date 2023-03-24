import { UseFormRegisterReturn } from "react-hook-form";

interface IInput01Props {
  type: "text" | "password";
  register: UseFormRegisterReturn;
}

export default function Input01(props: IInput01Props) {
  return <input type={props.type} {...props.register} />;
}
