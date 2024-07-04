import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="btn p-2 bg-blue-500 text-white rounded-md">
      {label}
    </button>
  );
};

export default Button;
