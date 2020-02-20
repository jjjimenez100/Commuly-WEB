import React from 'react';
import CLOUDFRONT_URL from '../../config/aws';

const ContentImage = ({ imageURLContent }) => (
  <div className="content-image">
    <div className="content-image-overlay" />
    <img src={`${CLOUDFRONT_URL}${imageURLContent}`} alt="url-post" />
  </div>
);

export default ContentImage;
