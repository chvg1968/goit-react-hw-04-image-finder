import { useState } from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const overrideStyle = {
  display: "block",
  margin: "0 auto",
  borderColor: "#23667e",
  size: 150,
  color: "#00ff11",
};

function Loader(props) {
  const { loading, color, size } = props;
  const [override] = useState(overrideStyle);

  // const handleColorChange = (e) => {
  //   onColorChange(e.target.value);
  // };

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        css={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  onColorChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default Loader;