import React from 'react';
import LoadingGif from '../../asset/loading-gif.gif';
import './Table.css';
import TableRow from './TableRow';

const Table = ({ data, setData, tableHeaders, rowClick, keys }) => {
  //   return;

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
              {tableHeaders.map((header, i) => {
                return <th key={i}>{header}</th>;
              })}
              {/* <th>Order Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th> */}
            </tr>
          </thead>
          <tbody>
            <TableRow
              keys={keys}
              data={data}
              className='row-data'
              //   onClick={() => rowClick(i)}
            ></TableRow>
            {/* <td>{rowData.orderNumber}</td>
                //   <td>{rowData.created}</td>
                //   <td>{rowData.status}</td>
                //   <td>{rowData.totalPayment}$</td> */}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
