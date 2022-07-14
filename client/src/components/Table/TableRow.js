import React from 'react';
import CartQuantityCounter from '../../containers/CartQuantityCounter';
import Button from '../Button/Button';

// function declartion vs function expression
//myTimer(100).then(() => console.log('after timer'))
// sum(x) recursia sum all  nubmer from 1 to x example sum(4) return 10

const TableRow = ({
  item,
  column,
  onClick,
  id,
  classname,
  renderDataTable,
  data,
}) => {
  console.log(data);
  return (
    <tr className={classname}>
      {column.map((columnItem, i) => {
        // console.log(columnItem);
        // if (columnItem.heading === 'Quantity') {
        //   return (
        //     <td key={i}>
        //       <Button
        //         size='circle-button'
        //         color='button--primary'
        //         buttonStyle='circle-button'
        //       >
        //         -
        //       </Button>
        //       {item[`${columnItem.value}`]}
        //       <Button
        //         size='circle-button'
        //         color='button--primary'
        //         buttonStyle='circle-button'
        //       >
        //         +
        //       </Button>
        //     </td>
        //   );
        // }
        if (typeof columnItem.value === 'string') {
          if (columnItem.value.includes('.')) {
            const itemSplit = columnItem.value.split('.');

            return <td key={i}>{item[itemSplit[0]][itemSplit[1]]}</td>;
          }
        }

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
