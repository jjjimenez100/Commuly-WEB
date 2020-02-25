import React from 'react';
import CLOUDFRONT_URL from '../../config/aws';

// FIXME: Styling on image description
const ContentImage = ({ imageURLContent, imageDescription }) => (
  <div className="content-image">
    <div className="content-image-overlay" />
    <img src={`${CLOUDFRONT_URL}${imageURLContent}`} alt="url-post" />
    <br />
    {imageDescription}
  </div>
);

export default ContentImage;
