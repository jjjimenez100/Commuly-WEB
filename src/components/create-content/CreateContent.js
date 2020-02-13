// generic create content here

import React from 'react';
import { CreateText, CreateImage } from 'components';
import { TEXT_CONTENT, CHART_CONTENT } from 'constants/card';

const CreateContent = ({ contentType, onClose }) => {
  switch (contentType) {
    case TEXT_CONTENT:
      return <CreateText onClose={onClose} />;
    case CHART_CONTENT:
      return <CreateImage onClose={onClose} />;
    default:
      return null;
  }
};

export default CreateContent;
