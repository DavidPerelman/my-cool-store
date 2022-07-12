import React, { useEffect } from 'react';
import Table from '../components/Table/Table';
import OrderTable from './OrderTable/OrderTable';

const OrderDetails = ({ editStatus, dataTable }) => {
  // useEffect(() => {

  //   setTimeout(() => {
  //     const trs = document.getElementsByTagName('tr');

  //     console.log(dataTable);
  //     for (let i = 0; i < dataTable.length; i++) {
  //       console.log(dataTable[i]);
  //     }

  //     const test = () => {
  //       for (let i = 1; i < trs.length; i++) {
  //         for (let z = 2; z < trs[i].childNodes.length; z++) {
  //           trs[i].childNodes[z].style.pointerEvents = 'none';
  //         }
  //       }
  //     };

  //     test();
  //   }, 5000);
  // }, []);

  const column = [
    { heading: 'Product', value: 'product.title' },
    { heading: 'Price', value: 'product.price' },
    { heading: 'Quantity', value: 'productQuantity' },
    { heading: 'Total', value: 'totalPrice' },
  ];

  const classname = '';

  return;
  return (
    <div className='order-div'>
      {(!dataTable && <h1>fdf</h1>) || (
        <Table data={dataTable} column={column} classname={classname}></Table>
      )}

      {/* <OrderTable
        orderData={orderData}
        orderDataBackup={orderDataBackup}
        editStatus={editStatus}
      ></OrderTable> */}
    </div>
  );
};

export default OrderDetails;
