import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const ManageCustomers = () => {
  const navigate = useNavigate();

  const back = async () => {
    navigate(`/admin`);
  };

  return (
    <div>
      <h1>ManageCustomers</h1>
      <Button onClick={back}>Back</Button>
    </div>
  );
};

export default ManageCustomers;
