import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles/common_css/popup.css';

const PopupMessage = ({ message, type, onClose }) => {
  const className = type === 'error' ? 'popup-error' : 'popup-success';
  return (
    <div className={`popup ${className}`}>
      <span className="popup-message">{message}</span>
      <button className="popup-close-button" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default PopupMessage;
