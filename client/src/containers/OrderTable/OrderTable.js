import React, { useState } from 'react';
import LoadingGif from '../../asset/loading-gif.gif';
import DeleteIconBlack from '../../asset/delete-icon-black.png';
import './OrderTable.css';

const OrderTable = ({ orderData, editStatus, orderDataBackup }) => {
  const totalQuantity = () => {
    let counter = 0;
    for (let i = 0; i < orderData.products.length; i++) {
      counter += orderData.products[i].productQuantity;
    }

    return counter;
  };

  const changeProductQuantity = (type, e, i, oldTotal) => {
    console.log(oldTotal);

    let quantityTd = e.target.parentNode.children[1];
    let quantityValue = parseInt(quantityTd.innerHTML);

    let totalPriceTd = quantityTd.parentNode.nextSibling;
    let totalPriceValue = parseInt(totalPriceTd.innerHTML);

    const incrementProductBtn = document.getElementById(`plus-table-span-${i}`);
    const subtractProductBtn = document.getElementById(`minus-table-span-${i}`);

    if (type === 'increment') {
      console.log((quantityValue += 1));

      console.log((quantityTd.innerHTML = quantityValue));

      console.log((totalPriceValue = quantityValue * oldTotal));
      console.log((totalPriceTd.innerHTML = totalPriceValue));
    }

    if (type === 'subtract') {
      console.log((quantityValue -= 1));

      console.log((quantityTd.innerHTML = quantityValue));

      console.log((totalPriceValue = quantityValue * oldTotal));
      console.log((totalPriceTd.innerHTML = totalPriceValue));
    }

    if (quantityValue === 1 || quantityValue === 0) {
      subtractProductBtn.style.pointerEvents = 'none';
    } else {
      subtractProductBtn.style.pointerEvents = 'auto';
    }

    if (quantityValue === 99) {
      incrementProductBtn.style.pointerEvents = 'none';
    } else {
      incrementProductBtn.style.pointerEvents = 'auto';
    }
  };

  console.log(orderData);

  return (
    <>
      {(!orderData && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <table>
          <thead>
            <tr>
              <td style={{ width: '37px' }}></td>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderData.products.map((product, i) => {
              return (
                <tr key={i} id={`product-${i}-row`}>
                  {(!editStatus && <td>{i + 1}</td>) || (
                    <td className='delete-product-order-icon'>
                      {' '}
                      <img
                        className='icon-button'
                        src={DeleteIconBlack}
                        alt='DeleteIconBlack'
                      />
                    </td>
                  )}
                  <td className='product-title-td'>{product.product.title}</td>
                  <td>{product.product.price}$</td>
                  {(!editStatus && (
                    <>
                      <td>{product.productQuantity}</td>
                      <td>
                        {product.product.price * product.productQuantity}$
                      </td>
                    </>
                  )) || (
                    <>
                      <td>
                        <span
                          className='minus-table-span'
                          id={`minus-table-span-${i}`}
                          onClick={(e) =>
                            changeProductQuantity(
                              'subtract',
                              e,
                              i,
                              product.totalPrice
                            )
                          }
                        >
                          -
                        </span>{' '}
                        <span>{product.productQuantity}</span>{' '}
                        <span
                          className='plus-table-span'
                          id={`plus-table-span-${i}`}
                          onClick={(e) =>
                            changeProductQuantity(
                              'increment',
                              e,
                              i,
                              product.totalPrice
                            )
                          }
                        >
                          +
                        </span>
                      </td>
                      <td>{product.totalPrice}$</td>
                    </>
                  )}
                </tr>
              );
            })}
            <tr className='table-bottom'>
              <td></td>
              <td></td>
              <td></td>
              <td>{totalQuantity()}</td>
              <td>{orderData.totalPayment}$</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderTable;
