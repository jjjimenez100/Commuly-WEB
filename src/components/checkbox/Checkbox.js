import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'components';

const Checkbox = ({ id, labelText, checked, onChange, className }) => (
  <label htmlFor={id} className={`checkbox ${className}`}>
    <input
      id={id}
      name="checkbox-button"
      type="checkbox"
      className="checkbox-button"
      checked={checked}
      onChange={onChange}
    />
    <span className="checkbox-circle" />
    <Typography className="checkbox-text">{labelText}</Typography>
  </label>
);

Checkbox.defaultProps = {
  id: 'checkbox',
  labelText: '',
  className: '',
};

Checkbox.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
