import React from 'react';
import LoadingGif from '../../asset/loading-gif.gif';
import TableRow from './TableRow';
import './Table.css';

const Table = ({ data, setData, tableHeaders, rowClick, keys, onClick }) => {
  console.log(data);
  return (
    <div>
      {(!data && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        // <table>
        //   <thead>
        //     <tr>
        //       {tableHeaders.map((header, i) => {
        //         return <th key={i}>{header}</th>;
        //       })}
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <TableRow
        //       keys={keys}
        //       data={data}
        //       className='row-data'
        //       rowClick={() => rowClick}
        //     ></TableRow>
        //   </tbody>
        // </table>

        <>
          <th>Order Number</th>
          <th>Date</th>
          <th>Status</th>
          <th>Payment</th>
        </>
      )}
    </div>
  );
};

export default Table;
