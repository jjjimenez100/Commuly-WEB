import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Typography } from 'components';

/*
Controlled Input component
Generic input supported types: text, number, email, password
TODO: Custom message for form validation
TODO: Active style
*/

const Input = ({ id, className, name, type, placeholder, labelText, onChange, value }) => {
  const inputClassname = classnames('input', {
    [`input-${type}`]: type,
    [`${className}`]: className,
  });

  return (
    <label htmlFor={id} className={inputClassname}>
      <Typography variant="subtitle" className="input-description">
        {labelText}
      </Typography>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className="input-area"
        placeholder={placeholder}
      />
    </label>
  );
};

Input.defaultProps = {
  id: '',
  type: 'text',
  placeholder: '',
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
