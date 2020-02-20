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

const Input = ({
  id,
  className,
  name,
  type,
  placeholder,
  labelText,
  onChange,
  value,
  icon,
  ...props
}) => {
  const inputClassname = classnames('input', {
    [`input-${type}`]: type,
    [`${className}`]: className,
  });

  const areaClassname = classnames('input-area', {
    'input-area-icon-hidden': !icon,
  });

  return (
    <label htmlFor={id} className={inputClassname}>
      {labelText && (
        <Typography variant="subtitle" className="input-description">
          {labelText}
        </Typography>
      )}
      <div className={areaClassname}>
        {icon && <img src={icon} alt="input-icon" className="input-area-icon" />}
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </label>
  );
};

Input.defaultProps = {
  id: '',
  type: 'text',
  placeholder: '',
  labelText: '',
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'date', 'time']),
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
