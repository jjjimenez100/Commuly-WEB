/* eslint-disable no-unused-vars */
import React from 'react';
import moment from 'moment';
import { Typography } from 'components';
import CLOUDFRONT_URL from '../../config/aws';

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
  const convertTime = time => {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);
    if (hours > 12) {
      return `${hours - 12}:${minutes} PM`;
    }

    return `${time} AM`;
  };

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
          ({convertTime(startTime)} - {convertTime(endTime)})
        </Typography>
      </div>
    </div>
  );
};

export default ContentScheduledEvent;
