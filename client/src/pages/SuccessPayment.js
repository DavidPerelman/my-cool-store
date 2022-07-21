import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SuccessPayment = () => {
  const { paymentId } = useParams();
  const [sessionData, setSessionData] = useState('');
  useEffect(() => {
    const id = paymentId.slice(3, paymentId.length);

    fetch(`${process.env.REACT_APP_API_URL}/payment/checkout-session/${id}`)
      .then((res) => res.json())
      .then((session) => {
        console.log(session);
        setSessionData(JSON.stringify(session));
      });
  }, []);

  return (
    <div>
      <h1>Thank You!</h1>
      <p>{sessionData}</p>
    </div>
  );
};

export default SuccessPayment;
