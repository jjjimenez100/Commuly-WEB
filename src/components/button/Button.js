/* eslint-disable react/button-has-type */
/*
Button variants:
1. Small (done)
2. Medium (done)
3. Large (done)
4. Inline (No style) (done)
5. Ghost (done)
6. Primary (done) and Secondary Variants
7. Disabled (done)
8. Add box-shadow to these variants
9. Add icon + left and right positions (done)
10. Loading (done) (if loading, button is automatically disabled)
*/

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Spinner } from 'components';

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
  loading,
  className: styleClass,
  type,
}) => {
  // classname for button container
  const className = classnames('button', styleClass, {
    [`button-${size}`]: size,
    'button-inline': inline,
    'button-disabled': disabled || loading,
    [`button-${variant}`]: variant,
    [`button-position-${iconPosition}`]: icon && iconPosition,
  });

  // classname for icon inside button
  const buttonClassname = classnames('button-icon', {
    'button-icon-small': size === 'small',
    [`button-icon-${iconPosition}`]: icon && iconPosition,
  });

  return (
    <button name={name} type={type} onClick={onClick} className={className.trim()}>
      {loading ? (
        <Spinner size="small" inverted />
      ) : (
        <>
          {icon && <img src={icon} alt="icon-for-button" className={buttonClassname} />}
          {children}
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  name: '',
  type: 'button',
  size: 'medium',
  inline: false,
  loading: false,
  disabled: false,
  variant: 'primary',
  iconPosition: 'left',
};

Button.propTypes = {
  iconPosition: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'inline', 'inverted']),
  className: PropTypes.string,
  inline: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  name: PropTypes.string,
};

export default Button;
