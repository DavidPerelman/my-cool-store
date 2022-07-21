import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import StatusMessages, { useMessages } from '../../utils/StatusMessages';

const PaymentModal = ({ setPaymentModalOpen }) => {
  const elements = useElements();
  const stripe = useStripe();
  const [messages, addMessage] = useMessages();

  const handleClose = () => {
    setPaymentModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    addMessage('Creating payment intent...');

    const { error: backendError, clientSecret } = await fetch(
      `${process.env.REACT_APP_API_URL}/payment/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage('Payment intent created');
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

    if (stripeError) {
      addMessage(stripeError.message);
      return;
    }

    addMessage(`paymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);

    // const cardElement = elements.getElement(CardElement);
    // console.log(cardElement);
  };

  return (
    <>
      <Modal onClose={handleClose} title='Payment'>
        <form onSubmit={handleSubmit}>
          <CardElement />
        </form>
        <StatusMessages messages={messages} />
        <div className='modal-footer payment-modal-footer'>
          <Button
            size='user-modal-button'
            color='button--close'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button size='user-modal-button' onClick={handleSubmit}>
            Payment
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
