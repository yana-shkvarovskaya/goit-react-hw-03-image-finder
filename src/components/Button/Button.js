import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import './Button.css';

export default class Button extends Component {
  handleClick = () => {
    this.props.onClick();
    scroll.scrollToBottom();
  };
  render() {
    return (
      <button type="button" className="Button" onClick={this.handleClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func,
};
