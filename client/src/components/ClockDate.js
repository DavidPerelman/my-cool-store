import React, { useState, useEffect } from 'react';

const ClockDate = () => {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const renderClcok = () => {
    if (date.getHours() < 10) {
      return `0${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
    } else {
      return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
    }
  };

  return (
    <>
      <p className='date-paragraph'>{renderClcok()}</p>
    </>
  );
};

export default ClockDate;
