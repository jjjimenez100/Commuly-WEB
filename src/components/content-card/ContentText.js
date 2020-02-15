import React from 'react';
import { Typography } from 'components';

const ContentText = ({ textContent }) => {
  const { content } = textContent;
  return (
    <>
      <Typography className="content-card-content-text">{content}</Typography>
    </>
  );
};

export default ContentText;
