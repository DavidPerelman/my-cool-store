import React, { useState, useEffect } from 'react';

const ClockDate = () => {
  const [date, setDate] = useState(new Date());

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
    let options = { hour: 'numeric', minute: '2-digit' };

    if (date.getHours() < 10) {
      return `0${date.toLocaleString('he-IL', options)} ${getFullDate()}`;
    } else {
      return `${date.toLocaleString('he-IL', options)} ${getFullDate()}`;
    }
  };

  return (
    <>
      <p className='date-paragraph'>{renderClcok()}</p>
    </>
  );
};

export default ClockDate;
