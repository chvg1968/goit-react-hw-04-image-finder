import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    // Add event listeners for keydown and click events
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    // Remove event listeners for keydown and click events
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    // Check if the click event occurred outside the Modal
    if (this.modalRef && !this.modalRef.contains(event.target)) {
      // Call the onClose prop if it exists
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  handleKeyDown = (event) => {
    // Check if the Escape key was pressed
    if (event.keyCode === 27) {
      // Call the onClose prop if it exists
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  setModalRef = (element) => {
    this.modalRef = element;
  };

  render() {
    return (
      <div className="Overlay">
        <div className="Modal" ref={this.setModalRef}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;
