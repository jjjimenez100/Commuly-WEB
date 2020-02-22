import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, checked, onChange, className, type, children }) => (
  <label htmlFor={id} className={`checkbox ${className}`}>
    <input
      id={id}
      name="checkbox-button"
      type={type}
      className="checkbox-button"
      defaultChecked={checked}
      onChange={onChange}
    />
    <span className="checkbox-circle" />
    {children && <div className="checkbox-text">{children}</div>}
  </label>
);

Checkbox.defaultProps = {
  className: '',
  type: 'checkbox',
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Checkbox;
