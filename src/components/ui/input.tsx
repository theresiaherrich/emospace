import React from "react";
import type { InputHTMLAttributes } from "react";
import Label from "./label";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <div className="flex flex-col font-lexend gap-1">
      <Label required={props.required} >
        {props.title}
      </Label>
      <input
      className={clsx(
        "px-5 py-2 rounded-2xl border-2 border-[#351A57] border-opacity-40 font-bold text-black placeholder:text-black placeholder:text-opacity-40 bg-[#CECECE] backdrop-blur-sm bg-opacity-40",
        className,
      )}
      {...props}
      />
    </div>
  );
};

export default Input;