import React from 'react';
import { ContentText } from 'components';
import { TEXT_CONTENT } from 'constants/card';

const ContentCard = ({ contentCardType, ...props }) => {
  switch (contentCardType) {
    case TEXT_CONTENT:
      return <ContentText {...props} />;
    default:
      return null;
  }
};

export default ContentCard;
