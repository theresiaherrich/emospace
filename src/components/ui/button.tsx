import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant, className, ...props }) => {
  return (
    <button
      className={clsx(
        'py-2 rounded-2xl font-lexend font-bold text-base transition-colors duration-200 hover:bg-[#7a4bb0]',
        variant === 'primary' && 'bg-[#593187] text-white',
        variant === 'secondary' && 'bg-gray-200 text-[#351A57]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;