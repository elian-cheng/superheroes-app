import React, { FC, MouseEventHandler } from 'react';
import Modal from 'components/Modal/Modal';

interface IOrderConfirmation {
  handleModal: MouseEventHandler<HTMLElement>;
}

const OrderConfirmation: FC<IOrderConfirmation> = ({ handleModal }) => {
  return (
    <Modal handleModal={handleModal}>
      <p className="form-info">Your order was successfully submitted!</p>
    </Modal>
  );
};
export default OrderConfirmation;
