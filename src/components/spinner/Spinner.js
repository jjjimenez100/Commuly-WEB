// from coursely
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Spinner = ({ size, border, inverted, variant, block }) => {
  const spinnerClassname = classnames('spinner', {
    'spinner-inverted': inverted,
    [`spinner-${variant}`]: variant,
    [`spinner-${size}`]: size,
  });

  return (
    <div className={`spinner-wrapper ${block ? 'spinner-wrapper-block' : ''}`}>
      <div className={spinnerClassname} style={{ borderWidth: border }} />
    </div>
  );
};

Spinner.defaultProps = {
  border: 3,
  inverted: false,
  variant: 'primary',
  block: false,
  size: 'medium',
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  border: PropTypes.number,
  inverted: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  block: PropTypes.bool,
};

export default Spinner;
