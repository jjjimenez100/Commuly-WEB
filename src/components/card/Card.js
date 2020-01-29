/*
To change the width of the card manually, use your own class instead.
*/

import React from 'react';

const Card = ({ children, className = '', fullWidth = false }) => {
  const cn = `card ${className} ${fullWidth ? 'full-width' : ''}`;

  return <div className={cn.trim()}>{children}</div>;
};

export default Card;
