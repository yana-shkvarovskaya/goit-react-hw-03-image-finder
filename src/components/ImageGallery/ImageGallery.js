import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import api from 'services/apiService';
import './ImageGallery.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    picture: null,
    pictures: [],
    error: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.pictureName !== this.props.pictureName) {
      this.setState({ status: 'pending', pictures: [] });
      await this.handleRenderPage();
    }
  }

  handleRenderPage = async () => {
    const { pictureName, page } = this.props;

    try {
      const { hits } = await api.fetchImages(pictureName, page);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
        status: Status.RESOLVED,
        page: 2,
      }));
    } catch (e) {
      this.setState({ status: Status.REJECTED });
    }
  };

  handleAddPage = async () => {
    try {
      const { hits } = await api.fetchImages(
        this.props.pictureName,
        this.state.page
      );
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
        status: Status.RESOLVED,
        page: 2,
      }));
    } catch (e) {
      this.setState({ status: Status.REJECTED });
    }
  };

  render() {
    const { status, pictures } = this.state;

    return (
      <>
        {status === 'idle' && (
          <p className="Phrase">Enter the word to start the search</p>
        )}

        {status === 'pending' && <Loader />}

        {!pictures.length && status === 'resolved' && (
          <p className="Phrase">No results</p>
        )}

        {pictures.length !== 0 && status === 'resolved' && (
          <>
            <ul className="ImageGallery">
              {pictures.map(picture => (
                <ImageGalleryItem picture={picture} key={picture.id} />
              ))}
            </ul>
            <Button onClick={this.handleAddPage} />
          </>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  handleRenderPage: PropTypes.func,
  handleAddPage: PropTypes.func,
};
