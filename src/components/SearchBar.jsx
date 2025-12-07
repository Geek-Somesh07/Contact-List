import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="search-container">
    <input 
      type="text" 
      className="search-input" 
      placeholder="Search by name, phone, or email..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

export default SearchBar;