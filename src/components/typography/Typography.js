/* eslint-disable react/require-default-props */
/*
Typography variants
1. Inline
2. Heading (1-5)
3. Subtitle

TODO:
1. Use classnames package instead + same for other reusable components
*/

import React from 'react';
import PropTypes from 'prop-types';

const Typography = ({ as, variant, inline, children, className }) => {
  let Text = as || variant || 'p';
  let cn = `typography ${className} `;

  if (variant) {
    cn += `typography-${variant}`;
  }

  if (!variant.startsWith('h')) {
    Text = as || 'div';
  }

  if (inline) {
    cn += ' typography-inline';
  }

  return <Text className={cn.trim()}>{children}</Text>;
};

Typography.defaultProps = {
  variant: 'p',
  className: '',
};

Typography.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'p', 'div', 'span']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle', 'body']),
};

export default Typography;
