import * as React from "react";
import type { LabelHTMLAttributes } from "react";
import clsx from "clsx";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ className, required, ...props }) => {
    return (
        <label
        className={clsx(
            "text-[#474747] font-bold text-base",
            required && "after:content-['*'] after:text-red-500 after:ml-1",
            className
        )}
        {...props}
        />
    );
}

export default Label;