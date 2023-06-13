import React from 'react';
import Input from '../../../../components/Input/Input';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IFormData } from '../Form/Form';

interface IRadio {
  validationRules: Record<string, unknown>;
  register: UseFormRegister<IFormData>;
  error: FieldError | undefined;
}

const Radio: React.FC<IRadio> = ({ validationRules, register, error }) => {
  return (
    <>
      <p className="form-info">Do you need an order confirmation call?</p>
      <Input
        label="Yes, I need a call"
        name="call"
        input={{
          id: 'call-yes',
          type: 'radio',
          value: 'Yes',
        }}
        validationRules={validationRules}
        register={register}
        error={error}
      />
      <Input
        label="No, don't call me"
        name="call"
        input={{
          id: 'call-no',
          type: 'radio',
          value: 'No',
        }}
        validationRules={validationRules}
        register={register}
        error={error}
      />
    </>
  );
};

export default Radio;
