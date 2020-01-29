/*
TODO: Small variant for Horizontal Line
*/

import React from 'react';

const HorizontalLine = ({ className = '', small = false }) => (
  <div className={`line ${className}`.trim()}>
    <div className={`${small ? 'line-small' : 'line-fixed'}`} />
    {!small && <div className="line-extend" />}
  </div>
);

export default HorizontalLine;
