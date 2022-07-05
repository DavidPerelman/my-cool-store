import React, { useState } from 'react';
import { useCart } from '../../context/cartContext';
import LoadingGif from '../../asset/loading-gif.gif';
import DeleteIconBlack from '../../asset/delete-icon-black.png';
import './OrderTable.css';

const OrderTable = ({ orderData, editStatus }) => {
  const [quantity, setQuantity] = useState(false);

  const totalQuantity = () => {
    let counter = 0;
    for (let i = 0; i < orderData.products.length; i++) {
      counter += orderData.products[i].productQuantity;
    }

    return counter;
  };

  // const incrementProductQuantity = (e, i) => {
  //   let priceValue = document.getElementById(`product-${i}-row`).children[2]
  //     .childNodes[0];

  //   parseInt(priceValue.nodeValue);

  //   let quantityValue = parseInt(e.target.parentNode.children[1].innerHTML);

  //   if (quantityValue === 99) {
  //     return;
  //   }
  //   quantityValue =
  //     e.target.parentNode.children[1].innerHTML =
  //     quantityValue +=
  //       1;

  //   let newValue =
  //     (priceValue.nodeValue = parseInt(priceValue.nodeValue)) * quantityValue;

  //   document.getElementById(
  //     `product-${i}-row`
  //   ).children[4].childNodes[0].nodeValue = `${newValue}`;
  // };

  const changeProductQuantity = (type, e, i) => {
    let quantityValue = parseInt(e.target.parentNode.children[1].innerHTML);

    const incrementProductBtn = document.getElementById(`plus-table-span-${i}`);
    const subtractProductBtn = document.getElementById(`minus-table-span-${i}`);

    let totalPriceValue = parseInt(
      document.getElementById(`product-${i}-row`).children[4].childNodes[0]
        .nodeValue
    );

    const priceValue = parseInt(
      document.getElementById(`product-${i}-row`).children[2].childNodes[0]
        .nodeValue
    );

    if (type === 'increment') {
      e.target.style.pointerEvents = 'auto';
      quantityValue =
        e.target.parentNode.children[1].innerHTML =
        quantityValue +=
          1;
    }

    if (type === 'subtract') {
      e.target.style.pointerEvents = 'auto';
      quantityValue =
        e.target.parentNode.children[1].innerHTML =
        quantityValue -=
          1;
    }

    if (quantityValue === 1) {
      console.log((subtractProductBtn.style.pointerEvents = 'none'));
    } else {
      console.log((subtractProductBtn.style.pointerEvents = 'auto'));
    }

    if (quantityValue === 99) {
      incrementProductBtn.style.pointerEvents = 'none';
    } else {
      console.log((incrementProductBtn.style.pointerEvents = 'auto'));
    }

    totalPriceValue = priceValue * quantityValue;

    document.getElementById(
      `product-${i}-row`
    ).children[4].childNodes[0].nodeValue = `${totalPriceValue}`;
  };

  // const subtractProductQuantity = (e, i) => {
  //   let totalPriceValue = document.getElementById(`product-${i}-row`)
  //     .children[4].childNodes[0].nodeValue;

  //   let priceValue = document.getElementById(`product-${i}-row`).children[2]
  //     .childNodes[0];

  //   parseInt(priceValue.nodeValue);

  //   let quantityValue = parseInt(e.target.parentNode.children[1].innerHTML);

  //   if (quantityValue === 1) {
  //     return;
  //   }
  //   quantityValue =
  //     e.target.parentNode.children[1].innerHTML =
  //     quantityValue -=
  //       1;

  //   totalPriceValue =
  //     (priceValue.nodeValue = parseInt(priceValue.nodeValue)) * quantityValue;

  //   document.getElementById(
  //     `product-${i}-row`
  //   ).children[4].childNodes[0].nodeValue = `${totalPriceValue}`;
  // };

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
                  {(!editStatus && <td></td>) || (
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
                  {(!editStatus && <td>{product.productQuantity}</td>) || (
                    <td>
                      <span
                        className='minus-table-span'
                        id={`minus-table-span-${i}`}
                        onClick={(e) => changeProductQuantity('subtract', e, i)}
                      >
                        -
                      </span>{' '}
                      <span>{product.productQuantity}</span>{' '}
                      <span
                        className='plus-table-span'
                        id={`plus-table-span-${i}`}
                        onClick={(e) =>
                          changeProductQuantity('increment', e, i)
                        }
                      >
                        +
                      </span>
                    </td>
                  )}
                  <td>{product.productQuantity * product.product.price}$</td>
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
