import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import CustomersServices from '../../../services/CustomersServices';

const ManageCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    CustomersServices.fetchAllCustomers().then((data) => {
      console.log(data.customers);
      setCustomers(data.customers);
      setTableData(data.customers);
      // setPaginatedProducts(data.products.slice(0, 10));
    });
  }, []);

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
