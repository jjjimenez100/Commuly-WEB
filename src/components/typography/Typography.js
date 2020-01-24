/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const Typography = ({ as, variant, inline, children, className }) => {
  const Text = as || variant || 'p';
  let cn = `typography ${className} `;

  if (variant) {
    cn += `typography-${variant}`;
  }

  if (inline) {
    cn += 'typography-inline';
  }

  return <Text className={cn.trim()}>{children}</Text>;
};

Typography.defaultProps = {
  variant: 'p',
  className: '',
};

Typography.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'inline', 'div', 'p', 'span']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
};

export default Typography;
