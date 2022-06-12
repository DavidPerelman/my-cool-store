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
      if (date.getMonth() < 10) {
        return `0${date.toLocaleTimeString()} ${date.getDate()}.0${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
      } else {
        return `0${date.toLocaleTimeString()} ${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
      }
    } else {
      if (date.getMonth() < 10) {
        return `${date.toLocaleTimeString()} ${date.getDate()}.0${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
      } else {
        return `${date.toLocaleTimeString()} ${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
      }
    }
  };

  return (
    <>
      <p className='date-paragraph'>{renderClcok()}</p>
    </>
  );
};

export default ClockDate;
