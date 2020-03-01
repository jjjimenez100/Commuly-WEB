import React from 'react';
import { Typography } from 'components';

const ContentText = ({ textContent }) => {
  const { content, backgroundColor, textColor: color, title, textSize } = textContent;
  return (
    <>
      <Typography className="content-text-description">{content}</Typography>
      <div
        className="content-image content-text-title"
        style={{ backgroundColor, color, fontSize: `${textSize}px` }}
      >
        {title}
      </div>
    </>
  );
};

export default ContentText;
