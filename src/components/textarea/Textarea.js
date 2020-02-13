import React from 'react';
import { Typography } from 'components';
import PropTypes from 'prop-types';

const Textarea = ({ id, labelText, placeholder, className, onChange, value, name }) => (
  <label htmlFor={id} className={`textarea ${className}`.trim()}>
    <Typography variant="subtitle" className="textarea-description">
      {labelText}
    </Typography>
    <textarea
      name={name}
      id={id}
      className="textarea-area"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  </label>
);

Textarea.defaultProps = {
  className: '',
  labelText: '',
  placeholder: '',
};

Textarea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Textarea;
