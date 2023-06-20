import { Component } from 'react';
import Modal from '..//Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { src, alt } = this.props;
    const { showModal } = this.state;

    return (
      <li>
        <img
          src={src}
          alt={alt}
          className={css.ImageGalleryItemImage}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal src={src} alt={alt} closeModal={this.toggleModal} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
