import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'components';

const RadioButton = ({ id, labelText, className }) => (
  <label htmlFor={id} className={`radio ${className}`}>
    <input id={id} name="radio-button" type="radio" className="radio-button" />
    <span className="radio-circle" />
    <Typography className="radio-text">{labelText}</Typography>
  </label>
);

RadioButton.defaultProps = {
  id: 'radio',
  labelText: '',
  className: '',
};

RadioButton.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  className: PropTypes.string,
};

export default RadioButton;
