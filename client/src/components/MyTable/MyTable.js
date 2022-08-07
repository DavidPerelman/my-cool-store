import React from 'react';

const MyTable = ({ renderHeader, renderBody, renderFooter }) => {
  return (
    <table className='table'>
      <thead>
        <tr>{renderHeader()}</tr>
      </thead>
      <tbody>{renderBody()}</tbody>
      {renderFooter && <tfoot>{renderFooter()}</tfoot>}
    </table>
  );
};

export default MyTable;
