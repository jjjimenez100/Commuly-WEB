// generic create content here

import React from 'react';
import { CreateText, CreateImage, CreateScheduledContent } from 'components';
import { TEXT_CONTENT, IMAGE_CONTENT, SCHEDULED_CONTENT } from 'constants/card';

const CreateContent = ({ contentType, onClose }) => {
  switch (contentType) {
    case TEXT_CONTENT:
      return <CreateText onClose={onClose} />;
    case IMAGE_CONTENT:
      return <CreateImage onClose={onClose} />;
    case SCHEDULED_CONTENT:
      return <CreateScheduledContent onClose={onClose} />;
    default:
      return null;
  }
};

export default CreateContent;
