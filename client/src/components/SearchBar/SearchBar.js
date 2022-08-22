import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchQuery, setSearchStatus }) => {
  const onChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchStatus(true);
    if (e.target.value === '') {
      setSearchStatus(false);
    }
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
