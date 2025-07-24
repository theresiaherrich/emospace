import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-2xl shadow-[5px_5px_10px_0px_#00000040] p-5 transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;