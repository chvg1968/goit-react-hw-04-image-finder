import { Component } from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const overrideStyle = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

class Loader extends Component {
  handleColorChange = (e) => {
    this.props.onColorChange(e.target.value);
  };

  render() {
    const { loading, color, size, onToggleLoading } = this.props;
    return (
      <div className="sweet-loading">
        <button onClick={onToggleLoading}>Toggle Loader</button>
        <input value={color} onChange={this.handleColorChange} placeholder="Color of the loader" />

        <ClipLoader
          color="#36d7b7"
          loading={loading}
          cssOverride={overrideStyle}
          size={45}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}

// Loader.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   color: PropTypes.string.isRequired,
//   size: PropTypes.number.isRequired,
//   onToggleLoading: PropTypes.func.isRequired,
//   onColorChange: PropTypes.func.isRequired,
// };

export default Loader;
