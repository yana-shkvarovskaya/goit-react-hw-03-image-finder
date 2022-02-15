import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

import './ImageGalleryItem.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { picture } = this.props;
    const { showModal } = this.state;
    return (
      <li key={picture.id} className="ImageGalleryItem">
        <img
          onClick={this.toggleModal}
          src={picture.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
        />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            src={picture.largeImageURL}
            alt={picture.tags}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func,
};
