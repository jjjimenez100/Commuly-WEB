import React from 'react';
import { Typography } from 'components';
import PropTypes from 'prop-types';

const Textarea = ({ id, description, placeholder, className }) => (
  <label htmlFor={id} className={`textarea ${className}`.trim()}>
    <Typography variant="subtitle" className="textarea-description" placeholder={placeholder}>
      {description}
    </Typography>
    <textarea id={id} className="textarea-area" />
  </label>
);

Textarea.defaultProps = {
  className: '',
  description: '',
  placeholder: '',
};

Textarea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
};

export default Textarea;
