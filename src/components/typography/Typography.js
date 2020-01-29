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
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Typography = ({ as, variant, inline, children, className: cn }) => {
  let Text = as || variant || 'p';
  if (variant && !variant.startsWith('h')) {
    Text = as || 'div';
  }

  const className = classnames('typography', cn, {
    [`typography-${variant}`]: variant,
    'typography-inline': inline,
  });

  return <Text className={className.trim()}>{children}</Text>;
};

Typography.defaultProps = {
  className: '',
};

Typography.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'p', 'div', 'span']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle', 'body']),
};

export default Typography;
