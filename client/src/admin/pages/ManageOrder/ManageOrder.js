import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import OrderContainer from '../../../containers/OrderContainer';
import BackIcon from '../../../asset/back-icon.png';
import './ManageOrder.css';
import MyTable from '../../../components/MyTable/MyTable';
import {
  increment,
  decrement,
  renderHeader,
} from '../../../utils/orderTableUtils';

const ManageOrder = () => {
  const [orderData, setOrderData] = useState(null);

  const backToOrders = () => {
    console.log('backToOrders');
  };

  // const renderBody = () => {
  //   return (
  //     dataTable &&
  //     dataTable.map((product, i) => {
  //       return (
  //         <tr key={i}>
  //           <td>{i + 1}</td>
  //           <td>{product.product.title}</td>
  //           <td>{product.product.price}$</td>
  //           <td className='quantity-table-data-cell'>
  //             {orderData.status === 'Open' && (
  //               <Button
  //                 size='circle-button'
  //                 onClick={() => decrementProductQuantity(dataTable, product)}
  //               >
  //                 -
  //               </Button>
  //             )}{' '}
  //             {product.productQuantity}{' '}
  //             {orderData.status === 'Open' && (
  //               <Button
  //                 size='circle-button'
  //                 onClick={() => incrementProductQuantity(dataTable, product)}
  //               >
  //                 +
  //               </Button>
  //             )}
  //           </td>
  //           <td>{product.product.price * product.productQuantity}$</td>
  //         </tr>
  //       );
  //     })
  //   );
  // };

  return;
  // return (
  //   <div className='OrderPage'>
  //     <Button onClick={backToOrders} size={'my-orders-button'}>
  //       <img
  //         className='icon-button my-orders-icon'
  //         src={BackIcon}
  //         alt='BackIcon'
  //       />
  //       My Orders
  //     </Button>
  //     <OrderContainer orderData={orderData}></OrderContainer>
  //     <div className='order-div'>
  //       <MyTable
  //         renderHeader={renderHeader}
  //         renderBody={renderBody}
  //         renderFooter={renderFooter}
  //       ></MyTable>
  //     </div>
  //     <div className='order-buttons-control'>
  //       <div className='order-page-buttons' style={{ height: '40px' }}>
  //         <Button onClick={cancelOrder}>
  //           Cancel Order{' '}
  //           <img
  //             className='icon-button'
  //             src={CancelChangesIcon}
  //             alt='CancelChangesIcon'
  //           />
  //         </Button>
  //         <Button onClick={deleteOrder}>
  //           Delete Order{' '}
  //           <img className='icon-button' src={DeleteIcon} alt='DeleteIcon' />
  //         </Button>
  //         {orderData && orderData.status === 'Open' && (
  //           <Button onClick={checkout}>
  //             Check Out{' '}
  //             <img
  //               className='icon-button'
  //               src={CreditCardIcon}
  //               alt='CreditCardIcon'
  //             />
  //           </Button>
  //         )}
  //       </div>
  //       {(changesHappend && (
  //         <div className='order-changes-buttons'>
  //           <Button onClick={cancelChanges}>
  //             Cancel Changes{' '}
  //             <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
  //           </Button>
  //           <Button onClick={saveChanges}>
  //             Save Changes{' '}
  //             <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
  //           </Button>
  //         </div>
  //       )) || <div></div>}
  //     </div>
  //   </div>
  // );
};

export default ManageOrder;
