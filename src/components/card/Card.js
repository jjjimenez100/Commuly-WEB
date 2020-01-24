import React from 'react';

const Card = ({ children, fullWidth = false }) => {
  const cn = `card ${fullWidth ? 'full-width' : ''}`;
  return <div className={cn.trim()}>{children}</div>;
};

export default Card;
