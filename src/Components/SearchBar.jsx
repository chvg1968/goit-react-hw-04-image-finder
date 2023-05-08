import { Component } from "react";
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <div className="Searchbar">
      <form className="SearchForm"  onSubmit={this.handleFormSubmit}>
        <input className="SearchForm-input"
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="Search images and photos"
        />
        <button className="SearchForm-button" type="submit">Search</button>
      </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;