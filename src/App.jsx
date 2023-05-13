import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Loader from "./Components/Loader";
import Modal from "./Components/Modal";
import "./Styles/styles.css";

const PIXABAY_API_KEY = "34211460-a83c7ce03bca96928d95fb98a";
const PIXABAY_API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&image_type=photo&pretty=true&q=`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);  
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const fetchImages = () => {
    if (searchQuery !== "") { 
      setLoading(true);
      setError(null);

      fetch(`${PIXABAY_API_URL}${searchQuery}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.totalHits === 0) {
            setError("No images found for the search query.");
            setLoading(false);
            setImages([]);
            alert("No images found for the search query.");
          } else {
            setImages((prevImages) =>
              page === 1 ? data.hits : [...prevImages, ...data.hits]
            );
            setLoading(false);
          }
        })
        .catch(() => {
          setError("Error fetching images. Please try again later.");
          setLoading(false);
          setImages([]);
          alert("Error fetching images. Please try again later.");
        });
    } else {
      setError("Please enter a search query.");
      setLoading(false);
      setImages([]);
      // alert("Please enter a search query.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [searchQuery, page]);

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {error && <div className="ErrorMessage">{error}</div>}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {!loading && images.length > 0 && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      {selectedImage && (
        <Modal onClose={handleCloseModal}>
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
        </Modal>
      )}
    </div>
  );
}

export default App;