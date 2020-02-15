import React from 'react';

const ContentImage = ({ imageURLContent }) => (
  <div className="content-image">
    <div className="content-image-overlay" />
    <img src={imageURLContent} alt="url-post" />
  </div>
);

export default ContentImage;
