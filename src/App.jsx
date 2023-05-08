import { Component } from "react";
import SearchBar from "./Components/SearchBar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Loader from "./Components/Loader";
import Modal from "./Components/Modal";
import "./Styles/styles.css";

const PIXABAY_API_KEY = "34211460-a83c7ce03bca96928d95fb98a";
const PIXABAY_API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&image_type=photo&pretty=true&q=`;



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
      loading: false,
      error: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleSearch(query) {
    this.setState({ searchQuery: query, page: 1 });
  }

  handleLoadMore() {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  }

  handleImageClick(image) {
    this.setState({ selectedImage: image });
  }

  handleCloseModal() {
    this.setState({ selectedImage: null });
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages() {
    if (this.state.searchQuery !== "") {
      this.setState({ loading: true, error: null });
  
      fetch(
        `${PIXABAY_API_URL}${this.state.searchQuery}&page=${this.state.page}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.totalHits === 0) {
            this.setState({
              error: "No images found for the search query.",
              loading: false,
              images: [], // Clear the images array if an error occurs
            });
            alert("No images found for the search query.");
          } else {
            this.setState((prevState) => ({
              images:
                prevState.page === 1 ? data.hits : [...prevState.images, ...data.hits],
              loading: false,
            }));
          }
        })
        .catch(() => {
          this.setState({
            error: "Error fetching images. Please try again later.",
            loading: false,
            images: [], // Clear the images array if an error occurs
          });
          alert("Error fetching images. Please try again later.");
        });
    } else {
      this.setState({
        error: "Please enter a search query.",
        loading: false,
        images: [], // Clear the images array if an error occurs
      });
      // alert("Please enter a search query.");
    }
  }
  
  
  

  render() {
    const { images, selectedImage, loading, error } = this.state;

    return (
      <div className="App">
        <SearchBar onSearch={this.handleSearch} />
        {error && <div className="ErrorMessage">{error}</div>}  
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {!loading && images.length > 0 && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
        {selectedImage && (
          <Modal onClose={this.handleCloseModal}>
            <img
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
