// SearchBar.js
import React from 'react';
import { TextField } from '@material-ui/core';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '80px ' }}>
      <TextField
        label="Search by Heading"
        value={searchTerm}
        onChange={handleSearch}
        variant="outlined"
      />
    </div>
  );
};

export default SearchBar;

