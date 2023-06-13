import React from 'react';
import { IFormData } from '../Form/Form';
import { useController, UseControllerProps } from 'react-hook-form';

const Switcher = (props: UseControllerProps<IFormData, 'notifications'>) => {
  const { field } = useController(props);
  return (
    <>
      <p className="form-info">Do you want to receive notifications?</p>
      <div className="switch__wrapper">
        <span className="switch__label">No</span>
        <label className="toggle-switch">
          <input type="checkbox" id="notifications" {...field} />
          <span className="switch" />
        </label>
        <span className="switch__label">Yes</span>
      </div>
    </>
  );
};

export default Switcher;
