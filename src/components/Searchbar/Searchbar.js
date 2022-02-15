import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };
  handleNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.pictureName.trim() === '') {
      toast.error('Add picture name');
      return;
    }

    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <ImSearch style={{ marginRight: 8 }} />
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            name="pictureName"
            value={this.state.pictureName}
            onChange={this.handleNameChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  pictureName: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
