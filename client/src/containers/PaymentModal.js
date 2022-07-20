import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';

const PaymentModal = ({ setPaymentModalOpen }) => {
  const elements = useElements();
  const stripe = useStripe();

  const handleClose = () => {
    setPaymentModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);
  };

  return (
    <>
      <Modal onClose={handleClose} title='Login' textButton='Login'>
        <form>
          <CardElement />
        </form>
        <div className='modal-footer'>
          <Button
            size='user-modal-button'
            color='button--close'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button size='user-modal-button' onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
