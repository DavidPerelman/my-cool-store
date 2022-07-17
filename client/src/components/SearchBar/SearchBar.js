import React, { useState } from 'react';
import './SearchBar.css';

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
    <input
      className='SearchBar'
      placeholder='Search...'
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

export default SearchBar;
