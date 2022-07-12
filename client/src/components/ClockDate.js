import React, { useState, useEffect } from 'react';

const ClockDate = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 6000);

  const getFullDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let fullDate = dd + '.' + mm + '.' + yyyy;

    return fullDate;
  };

  getFullDate();

  const renderClcok = () => {
    return `${currentTime.slice(0, 5)} ${getFullDate()}`;
  };

  return (
    <>
      <p className='date-paragraph'>{renderClcok()}</p>
    </>
  );
};

export default ClockDate;
