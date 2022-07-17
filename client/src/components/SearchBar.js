import React, { useState } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const onChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
    console.log(searchQuery);
    // console.log(
    //   products.filter((product) =>
    //     product.title.toLowerCase().includes('ergonomic')
    //   )
    // );
  };

  return (
    <div>
      <input
        placeholder='Search...'
        onChange={(e) => {
          onChange(e);
        }}
      />
    </div>
  );
};

export default SearchBar;
