import React from 'react';

export interface IButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`button ${props.className || ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
