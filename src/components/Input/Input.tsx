import React, { InputHTMLAttributes } from 'react';
import { IFormData } from 'pages/HeroPage/components/Form/Form';
import { FieldError, UseFormRegister } from 'react-hook-form';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export interface IFormInput {
  label: string;
  input: IInput;
  name: keyof IFormData;
  register: UseFormRegister<IFormData>;
  error: FieldError | undefined;
}

const Input: React.FC<IFormInput> = ({
  label,
  name,
  input,
  register,
  error,
}) => {
  return (
    <>
      <div className="input">
        <label htmlFor={input.id} className="label-text">
          {label}
        </label>
        <input
          {...register(name)}
          {...input}
          className={error ? 'input-error' : 'form-input'}
        />
      </div>
      {error && (
        <p className="error-message" data-testid="inputError">
          {error.message}
        </p>
      )}
    </>
  );
};

export default Input;
