import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onSearch(query);
      }
    }

    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onSearch(query);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [query, onSearch]);

  const searchRef = useRef(null);

  return (
    <div className="Searchbar" ref={searchRef}>
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <input className="SearchForm-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
        <button className="SearchForm-button" type="submit">Search</button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;