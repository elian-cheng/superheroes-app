import React, { FC, MouseEventHandler, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface IModalProps {
  handleModal: MouseEventHandler<HTMLElement>;
  children: ReactNode;
}

const portalElement = document.getElementById('overlays') as HTMLElement;

const ModalOverlay: FC<IModalProps> = ({ handleModal, children }) => {
  return (
    <div className="modal">
      <button
        className="modal__close-btn"
        data-testid="modal-close-btn"
        onClick={handleModal}
      >
        &times;
      </button>
      <div className="modal__content">{children}</div>
    </div>
  );
};

const Modal: FC<IModalProps> = ({ handleModal, children }) => {
  return (
    <>
      {portalElement ? (
        ReactDOM.createPortal(
          <div className="backdrop" onClick={handleModal} />,
          portalElement
        )
      ) : (
        <div
          className="backdrop"
          data-testid="backdrop"
          onClick={handleModal}
        />
      )}
      {portalElement ? (
        ReactDOM.createPortal(
          <ModalOverlay handleModal={handleModal}>{children}</ModalOverlay>,
          portalElement
        )
      ) : (
        <ModalOverlay handleModal={handleModal}>{children}</ModalOverlay>
      )}
    </>
  );
};

export default Modal;
