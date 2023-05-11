import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Modal({ onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="Overlay">
      <div className="Modal" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;