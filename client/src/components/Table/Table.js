import React from 'react';
import LoadingGif from '../../asset/loading-gif.gif';
import './Table.css';

const Table = ({ data, rowClick }) => {
  console.log(data);
  return (
    <div>
      {(!data && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, i) => {
              return (
                <tr
                  key={i}
                  className='row-data'
                  onClick={() => rowClick(rowData._id)}
                >
                  <td>{rowData.orderNumber}</td>
                  <td>{rowData.created}</td>
                  <td>{rowData.status}</td>
                  <td>{rowData.totalPayment}$</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
