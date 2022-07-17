import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const onChange = (e) => {
    setSearchQuery(e.target.value);
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
