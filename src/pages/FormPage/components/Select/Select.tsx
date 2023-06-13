import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IFormData } from '../Form/Form';

interface ISelect {
  validationRules: Record<string, unknown>;
  register: UseFormRegister<IFormData>;
  error: FieldError | undefined;
}

const Select: React.FC<ISelect> = ({ validationRules, register, error }) => {
  return (
    <>
      <div className="select">
        <label htmlFor="delivery" className="select__label label-text">
          Delivery Type:
        </label>
        <select
          data-testid="deliverySelect"
          {...register('delivery', validationRules)}
          className={error ? 'select__options input-error' : 'select__options'}
          id="delivery"
          defaultValue="default"
        >
          <option disabled value="default">
            Choose the delivery type
          </option>
          <option>Courier</option>
          <option>Express</option>
          <option>Post office</option>
        </select>
      </div>
      {error && error.type === 'validate' && (
        <p className="error-message" data-testid="deliverySelectError">
          This field is required
        </p>
      )}
    </>
  );
};

export default Select;
