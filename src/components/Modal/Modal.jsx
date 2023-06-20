import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  handleOverlayClick = ({ target, currentTarget }) => {
    const { closeModal } = this.props;
    if (target === currentTarget) {
      closeModal();
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <div className={css.ModalOverlay} onClick={this.handleOverlayClick}>
        <div>
          <img className={css.Modal} src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
