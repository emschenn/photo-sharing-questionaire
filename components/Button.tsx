import React from "react";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: (params: any) => any;
};

const Button = ({ text, disabled = false, onClick }: ButtonProps) => {
  return (
    <div className="flex w-full justify-center pb-6">
      <button
        disabled={disabled}
        onClick={onClick}
        className="my-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md transition ease-in-out hover:scale-105 hover:font-medium  disabled:opacity-25 "
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
