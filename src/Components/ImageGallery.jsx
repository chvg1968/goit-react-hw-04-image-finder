import { useState, useEffect } from "react";
import PropTypes from "prop-types";


function ImageGallery(props) {
  const { images, onImageClick } = props;
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  return (
    <div className="ImageGallery">
      {galleryImages.map((image, id) => (
        <img
          className="ImageGalleryItem"
          key={id}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;