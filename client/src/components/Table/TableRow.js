import React from 'react';

// function declartion vs function expression
//myTimer(100).then(() => console.log('after timer'))
// sum(x) recursia sum all  nubmer from 1 to x example sum(4) return 10

const TableRow = ({ item, column, onClick, id, classname }) => {
  return (
    <tr className={classname}>
      {column.map((columnItem, i) => {
        if (columnItem.value.includes('.')) {
          const itemSplit = columnItem.value.split('.');

          return <td key={i}>{item[itemSplit[0]][itemSplit[1]]}</td>;
        } else {
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
        }
      })}
    </tr>
  );
};

export default TableRow;
