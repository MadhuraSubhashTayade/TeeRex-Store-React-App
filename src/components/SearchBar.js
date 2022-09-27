import "../index.css";
import "../queries.css";
import React from "react";
import { BiSearch, BiFilterAlt } from "react-icons/bi";

const SearchBar = ({
  searchText,
  handleSearchTextChange,
  handleMobileFilter,
}) => {
  return (
    <div className="search-container">
      <div className="search-text">
        <input
          type="text"
          placeholder="Search text here..."
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <div className="icon-container">
          <BiSearch className="search-icon" />
        </div>
        <button class="icon-container2">
          <BiFilterAlt className="filter-icon" onClick={handleMobileFilter} />
          {/* <BiX className="close-icon" /> */}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
