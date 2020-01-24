/* eslint-disable react/button-has-type */
/*
Button variants:
1. Small 
2. Medium
3. Large
4. TODO: Inline (No style)
5. TODO: Ghost
6. TODO: Primary and Secondary Variants
*/

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, size, className, type }) => {
  const cn = `button button-${size} ${className}`;

  return (
    <button type={type} onClick={onClick} className={cn.trim()}>
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
