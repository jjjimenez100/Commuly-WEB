import React from 'react';
import { Typography } from 'components';
import CLOUDFRONT_URL from '../../config/aws';

// FIXME: Styling on image description
const ContentImage = ({ imageURLContent, imageDescription }) => (
  <>
    <Typography className="content-text-description">{imageDescription}</Typography>
    <div className="content-image">
      <div className="content-image-overlay" />
      <img src={`${CLOUDFRONT_URL}${imageURLContent}`} alt="url-post" />
    </div>
  </>
);

export default ContentImage;
