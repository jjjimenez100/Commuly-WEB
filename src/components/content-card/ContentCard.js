import React from 'react';
import { ContentText } from 'components';
import { TEXT_CONTENT } from 'constants/card';

const ContentCard = ({ contentType, ...props }) => {
  switch (contentType) {
    case TEXT_CONTENT:
      return <ContentText {...props} />;
    default:
      return null;
  }
};

export default ContentCard;
