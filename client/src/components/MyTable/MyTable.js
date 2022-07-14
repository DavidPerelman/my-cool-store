import React from 'react';

const MyTable = ({ renderHeader, renderBody }) => {
  return (
    <table>
      <thead>
        <tr>{renderHeader()}</tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
};

export default MyTable;
