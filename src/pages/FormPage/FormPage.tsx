import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { addOrder } from 'store/formSlice';
import Form, { IFormData } from './components/Form/Form';
import OrderCardList from './components/OrderCardList/OrderCardList';

export interface IFormPage {
  ordersData: IFormData[] | [];
}

const FormPage: React.FC = () => {
  const { formData } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const setFormState = (order: IFormData) => {
    dispatch(addOrder(order));
  };

  return (
    <>
      <div className="orders__form-wrapper">
        <Form setFormState={setFormState} />
      </div>
      <h2 className="orders__title">Your orders:</h2>
      {formData.length ? (
        <OrderCardList ordersData={formData} />
      ) : (
        <p className="orders__subtitle">There are no orders yet</p>
      )}
    </>
  );
};

export default FormPage;
