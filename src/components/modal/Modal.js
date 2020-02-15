import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'components';
import CloseIcon from 'assets/icons/box-close.svg';

export const ModalBody = ({ className = '', children }) => (
  <div className={`modal-body ${className}`.trim()}>{children}</div>
);

export const ModalFooter = ({ className = '', children }) => (
  <div className={`modal-footer ${className}`.trim()}>{children}</div>
);

export const Modal = ({ isOpen, title, handleClose, className, children }) => {
  useEffect(() => {
    const handleKeydown = ({ keyCode }) => {
      if (isOpen && keyCode === 27) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, handleClose]);

  if (isOpen)
    return (
      <div className="modal">
        <div className={`modal-container ${className}`.trim()}>
          <div className="modal-header">
            <Typography variant="h4">{title}</Typography>
            <Button variant="inline" className="modal-header-close" onClick={handleClose}>
              <img src={CloseIcon} alt="close-icon" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    );

  return null;
};

Modal.defaultProps = {
  className: '',
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};
