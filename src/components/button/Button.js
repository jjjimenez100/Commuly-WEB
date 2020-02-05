/* eslint-disable react/button-has-type */
/*
Button variants:
1. Small 
2. Medium
3. Large
4. Inline (No style)
5. TODO: Ghost
6. TODO: Primary and Secondary Variants
7. TODO: Disabled
8. Add box-shadow to these variants
9. Add icon
*/

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({
  onClick,
  children,
  variant,
  size,
  inline,
  disabled,
  icon,
  iconPosition,
  name,
  className: styleClass,
  type,
}) => {
  const className = classnames(
    'button',
    {
      [`button-${size}`]: size,
      'button-inline': inline,
      'button-disabled': disabled,
      [`button-${variant}`]: variant,
      [`button-position-${iconPosition}`]: icon && iconPosition,
    },
    styleClass
  );

  const buttonClassname = classnames('button-icon', {
    'button-icon-small': size === 'small',
    [`button-icon-${iconPosition}`]: icon && iconPosition,
  });

  return (
    <button name={name} type={type} onClick={onClick} className={className.trim()}>
      {icon && <img src={icon} alt="icon-for-button" className={buttonClassname} />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  name: '',
  type: 'submit',
  size: 'medium',
  inline: false,
  disabled: false,
  variant: 'primary',
  iconPosition: 'left',
};

Button.propTypes = {
  iconPosition: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'inline']),
  className: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  name: PropTypes.string,
};

export default Button;
