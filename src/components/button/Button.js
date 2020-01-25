/* eslint-disable react/button-has-type */
/*
Button variants:
1. Small 
2. Medium
3. Large
4. TODO: Inline (No style)
5. TODO: Ghost
6. TODO: Primary and Secondary Variants
7. TODO: Disabled
8. Add box-shadow to these variants
*/

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, variant, className, type }) => {
  const cn = `button button-${variant} ${className}`;

  return (
    <button type={type} onClick={onClick} className={cn.trim()}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'submit',
  variant: 'medium',
};

Button.propTypes = {
  variant: PropTypes.oneOf(['small', 'medium', 'large', 'inline']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
