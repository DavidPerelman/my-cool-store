import React from 'react';
import LoadingGif from '../../asset/loading-gif.gif';
import TableRow from './TableRow';
import './Table.css';

const Table = ({ data, onClick, column, classname }) => {
  return (
    <div>
      {(!data && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <table id='table'>
          <thead>
            <tr>
              {column.map((item, i) => {
                return <th key={i}>{item.heading}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <TableRow
                  key={i}
                  item={item}
                  id={item._id}
                  column={column}
                  onClick={onClick}
                  classname={classname}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
