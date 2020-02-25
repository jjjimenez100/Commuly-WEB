/* eslint-disable no-unused-vars */
import React from 'react';
import moment from 'moment';
import { Typography } from 'components';
import CLOUDFRONT_URL from '../../config/aws';

// FIXME @Ced
const ContentScheduledEvent = ({
  scheduledEventContent: {
    imagePosterURL,
    startDate,
    endDate,
    startTime,
    endTime,
    title,
    description,
  },
}) => {
  return (
    <div className="content-event">
      <div className="content-image content-event-image">
        <div className="content-image-overlay" />
        <img src={`${CLOUDFRONT_URL}${imagePosterURL}`} alt="url-post" />
      </div>
      <div className="content-event-header">
        <div className="content-event-date">
          <Typography>
            {moment(startDate)
              .format('MMM')
              .toUpperCase()}
          </Typography>
          <Typography variant="h5">
            {moment(startDate)
              .format('DD')
              .toUpperCase()}
          </Typography>
        </div>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle" className="content-event-subtitle">
          ({startTime} - {endTime})
        </Typography>
      </div>
    </div>
  );
};

export default ContentScheduledEvent;
