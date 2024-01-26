import React, {useRef} from "react";

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  const asd = useRef<HTMLButtonElement | null>(null);
  console.log("testing is it working or not");
  return <button ref={asd}>{props.label}</button>;
};

export default Button;