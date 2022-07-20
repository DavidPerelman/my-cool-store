import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

// const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const StripeContainer = () => {
  const stripeTestPromise = loadStripe(
    'pk_test_51LMHebHwuFGjgD9FMmRH7NI5bEHperWkMoj16LBUtb8dsSOHrTvzNHWPivT7BMMwdi7SPhhUtbV8CIoawQfPwgzj00wFX0StK2'
  );

  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
