import React, { useState, useReducer } from 'react';
import { reducer } from '../../services/TableClicksReducer';
import { useNavigate } from 'react-router-dom';

// function declartion vs function expression
//myTimer(100).then(() => console.log('after timer'))
// sum(x) recursia sum all  nubmer from 1 to x example sum(4) return 10

const TableRow = ({ item, column, onClick, id }) => {
  return (
    <tr>
      {column.map((columnItem, i) => {
        return (
          <td
            key={i}
            onClick={() => {
              onClick(id);
            }}
          >
            {item[`${columnItem.value}`]}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
