import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'label';
  className?: string;
  active?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, variant, className, active, ...props }) => {
  return (
    <button
      className={clsx(
        'rounded-2xl font-lexend text-base transition-colors duration-200 hover:bg-[#7a4bb0]',
        variant === 'primary' && 'bg-[#593187] text-white py-2 font-bold',
        variant === 'secondary' && 'bg-white text-[#351A57] py-2 font-bold',
        variant === 'label' && [
          "border border-[#666666] py-1 px-3 rounded-lg items-center text-sm font-spartan transition",
          "hover:cursor-pointer hover:bg-[#E9DDF4] hover:text-[#593187] hover:border-[#633796]",
          active && "bg-[#E9DDF4] text-[#593187] border-[#633796] font-semibold",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;