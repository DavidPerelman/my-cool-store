import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

const InputSearchBar = () => {
  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default InputSearchBar;
