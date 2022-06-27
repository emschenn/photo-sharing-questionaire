import React from "react";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  color?: string;
  onClick: (params: any) => any;
};

const Button = ({
  text,
  disabled = false,
  color = "default",
  onClick,
}: ButtonProps) => {
  return (
    <div className="flex w-full justify-center">
      <button
        disabled={disabled}
        onClick={onClick}
        className={`my-4 rounded-lg ${
          color == "default" ? "bg-primary" : color
        } px-4 py-2 text-white shadow-md transition ease-in-out hover:scale-105 hover:font-medium  disabled:opacity-25 `}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
