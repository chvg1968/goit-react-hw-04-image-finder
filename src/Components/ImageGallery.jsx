import { Component } from "react";
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    return (
      <div className="ImageGallery">
        {this.props.images.map((image) => (
          <img className="ImageGalleryItem"
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => this.props.onImageClick(image)}
          />
        ))}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;