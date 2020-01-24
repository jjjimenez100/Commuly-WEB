/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, size, className, type }) => {
  const cn = `button button-${size} ${className}`;

  return (
    <button type={type} onClick={onClick} className={cn}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'submit',
  size: 'medium',
};

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
