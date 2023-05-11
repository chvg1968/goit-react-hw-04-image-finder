import { useState } from "react";
import PropTypes from 'prop-types';

function Button(props) {
  const [buttonText, setButtonText] = useState("Load More");

  const handleClick = () => {
    setButtonText("Loading...");
    props.onClick();
  };

  return (
    <button className="Button" onClick={handleClick}>
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default Button;