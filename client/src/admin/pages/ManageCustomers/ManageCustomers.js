import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import MyTable from '../../../components/MyTable/MyTable';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TablePagination from '../../../components/TablePagination/TablePagination';
import CustomersServices from '../../../services/CustomersServices';
import './ManageProducts.css';

const ManageCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paginatedCustomers, setPaginatedCustomers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    CustomersServices.fetchAllCustomers().then((data) => {
      setCustomers(data.customers);
      setTableData(data.customers);
      setPaginatedCustomers(data.customers.slice(0, 10));
    });
  }, []);

  console.log(customers);
  console.log(paginatedCustomers);

  const back = async () => {
    navigate(`/admin`);
  };

  const goToOrder = async (productId) => {
    console.log(productId);
    // navigate(`/order/${orderId}`);
  };

  const pageSize = 10;
  const pageCount = customers ? Math.ceil(customers.length / pageSize) : 0;
  const pageCountArray = new Array(pageCount).fill('').map((_, i) => i + 1);

  // if (pageCount === 1) {
  //   return null;
  // }

  const pagination = async (pageNum) => {
    setCurrentPage(pageNum);

    const startIndex = (pageNum - 1) * 10;

    const paginatedProduct = tableData.slice(startIndex, startIndex + 10);

    setPaginatedCustomers(paginatedProduct);
  };

  const renderHeader = () => {
    let headerData = [
      'No.',
      'Full Name',
      'Email',
      'Register Date',
      'Role',
      'Verified',
    ];

    return headerData.map((key, i) => {
      {
        return (
          <th key={i} id={`${key}-th`}>
            {key}
          </th>
        );
      }
    });
  };

  const renderBody = () => {
    console.log('tableData');
    console.log(tableData);
    return (
      (searchStatus &&
        tableData
          .filter(
            (customer) =>
              customer.fullName.toLowerCase().includes(searchQuery) ||
              customer.email.toLowerCase().includes(searchQuery) ||
              customer.role.toLowerCase().includes(searchQuery)
          )
          .map((customer, i) => {
            return (
              <tr
                key={i}
                className='row-data'
                onClick={() => {
                  goToOrder(customer._id);
                }}
              >
                <td>{i + 1}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.registerDate}</td>
                <td>{customer.role}</td>
                <td>{customer.verified.toString()}</td>
              </tr>
            );
          })) ||
      (paginatedCustomers &&
        paginatedCustomers
          .filter(
            (customer) =>
              customer.fullName.toLowerCase().includes(searchQuery) ||
              customer.email.toLowerCase().includes(searchQuery) ||
              customer.role.toLowerCase().includes(searchQuery)
          )
          .map((customer, i) => {
            return (
              <tr
                key={i}
                className='row-data'
                onClick={() => {
                  goToOrder(customer._id);
                }}
              >
                <td>{i + 1}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.registerDate}</td>
                <td>{customer.role}</td>
                <td>{customer.verified.toString()}</td>
              </tr>
            );
          }))
    );
  };

  return (
    <div>
      <h1>ManageCustomers</h1>
      <div className='controllers'>
        <div className='controllers-buttons'>
          <Button onClick={back} className='ManageCustomers-back-button'>
            Back
          </Button>
          {/* <Button onClick={handleShow} className='new-product-button'>
            New Product
          </Button> */}
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchStatus={setSearchStatus}
          searchStatus={searchStatus}
        />
      </div>

      <div className='customers-table'>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
        {searchStatus === false && (
          <TablePagination
            pages={pageCountArray}
            currentPage={currentPage}
            onClick={pagination}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCustomers;
